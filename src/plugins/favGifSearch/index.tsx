/*
 * Vencord, a modification for Discord's desktop app
 * Copyright (c) 2023 Vendicated and contributors
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import { definePluginSettings } from "@api/Settings";
import ErrorBoundary from "@components/ErrorBoundary";
import { Devs } from "@utils/constants";
import { t } from "@utils/i18n";
import definePlugin, { OptionType } from "@utils/types";
import { useCallback, useEffect, useRef, useState } from "@webpack/common";

interface SearchBarComponentProps {
    ref?: React.RefObject<any>;
    autoFocus: boolean;
    size: string;
    onChange: (query: string) => void;
    onClear: () => void;
    query: string;
    placeholder: string;
    className?: string;
}

type TSearchBarComponent =
    React.FC<SearchBarComponentProps>;

interface Gif {
    format: number;
    src: string;
    width: number;
    height: number;
    order: number;
    url: string;
}

interface Instance {
    dead?: boolean;
    state: {
        resultType?: string;
    };
    props: {
        favCopy: Gif[],

        favorites: Gif[],
    },
    forceUpdate: () => void;
}

export const settings = definePluginSettings({
    searchOption: {
        type: OptionType.SELECT,
        description: "The part of the url you want to search",
        options: [
            {
                label: "Entire Url",
                value: "url"
            },
            {
                label: "Path Only (/somegif.gif)",
                value: "path"
            },
            {
                label: "Host & Path (tenor.com somgif.gif)",
                value: "hostandpath",
                default: true
            }
        ] as const
    }
});

export default definePlugin({
    name: "FavoriteGifSearch",
    authors: [Devs.ewlle, Devs.kraethis, Devs.Sharp],
    description: "Adds a search bar to favorite gifs. Discord now has this built in, so the plugin no longer changes anything.",
    tags: ["Media", "Customisation"],

    // Discord's favorites tab ships its own search bar now, so these patches had nothing left to replace
    patches: [],

    settings,

    getTargetString,

    instance: null as Instance | null,
    renderSearchBar(instance: Instance, SearchBarComponent: TSearchBarComponent) {
        this.instance = instance;
        return (
            <ErrorBoundary noop>
                <SearchBar instance={instance} SearchBarComponent={SearchBarComponent} />
            </ErrorBoundary>
        );
    },

    getFav(favorites: Gif[]) {
        if (!this.instance || this.instance.dead) return favorites;
        const { favorites: filteredFavorites } = this.instance.props;

        return filteredFavorites != null && filteredFavorites?.length !== favorites.length ? filteredFavorites : favorites;

    }
});

function SearchBar({ instance, SearchBarComponent }: { instance: Instance; SearchBarComponent: TSearchBarComponent; }) {
    const [query, setQuery] = useState("");
    const ref = useRef<HTMLElement>(null);

    const onChange = useCallback((searchQuery: string) => {
        setQuery(searchQuery);
        const { props } = instance;

        // return early
        if (searchQuery === "") {
            props.favorites = props.favCopy;
            instance.forceUpdate();
            return;
        }

        // scroll back to top
        ref.current
            ?.closest("#gif-picker-tab-panel")
            ?.querySelector('[class*="scrollerBase"]')
            ?.scrollTo(0, 0);

        const result =
            props.favCopy
                .map(gif => ({
                    score: fuzzySearch(searchQuery.toLowerCase(), getTargetString(gif.url ?? gif.src).replace(/(%20|[_-])/g, " ").toLowerCase()),
                    gif,
                }))
                .filter(m => m.score != null) as { score: number; gif: Gif; }[];

        result.sort((a, b) => b.score - a.score);
        props.favorites = result.map(e => e.gif);

        instance.forceUpdate();
    }, [instance.state]);

    useEffect(() => {
        return () => {
            instance.dead = true;
        };
    }, []);

    return (
        <SearchBarComponent
            ref={ref}
            autoFocus={true}
            size="md"
            className=""
            onChange={onChange}
            onClear={() => {
                setQuery("");
                if (instance.props.favCopy != null) {
                    instance.props.favorites = instance.props.favCopy;
                    instance.forceUpdate();
                }
            }}
            query={query}
            placeholder={t("Search Favorite Gifs")}
        />
    );
}

export function getTargetString(urlStr: string) {
    let url: URL;
    try {
        url = new URL(urlStr);
    } catch (err) {
        // Can't resolve URL, return as-is
        return urlStr;
    }
    switch (settings.store.searchOption) {
        case "url":
            return url.href;
        case "path":
            if (url.host === "media.discordapp.net" || url.host === "tenor.com")
                return url.pathname.split("/").at(-1) ?? url.pathname;
            return url.pathname;
        case "hostandpath":
            if (url.host === "media.discordapp.net" || url.host === "tenor.com")
                return `${url.host} ${url.pathname.split("/").at(-1) ?? url.pathname}`;
            return `${url.host} ${url.pathname}`;

        default:
            return "";
    }
}

function fuzzySearch(searchQuery: string, searchString: string) {
    let searchIndex = 0;
    let score = 0;

    for (let i = 0; i < searchString.length; i++) {
        if (searchString[i] === searchQuery[searchIndex]) {
            score++;
            searchIndex++;
        } else {
            score--;
        }

        if (searchIndex === searchQuery.length) {
            return score;
        }
    }

    return null;
}
