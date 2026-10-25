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

import "./SpecialCard.css";

import { Card } from "@components/Card";
import { Divider } from "@components/Divider";
import { Heading } from "@components/Heading";
import { Paragraph } from "@components/Paragraph";
import { classNameFactory } from "@utils/css";
import { Clickable } from "@webpack/common";
import type { CSSProperties, PropsWithChildren, ReactNode } from "react";

const cl = classNameFactory("vc-special-");

interface StyledCardProps {
    title: string;
    subtitle?: string;
    description: string;
    cardImage?: string;
    backgroundImage?: string;
    backgroundColor?: string;
    buttonTitle?: string;
    buttonOnClick?: () => void;
}

export function SpecialCard({ title, subtitle, description, cardImage, backgroundImage, backgroundColor, buttonTitle, buttonOnClick: onClick, children }: PropsWithChildren<StyledCardProps>) {
    const cardStyle: React.CSSProperties = {
        backgroundColor: backgroundColor || "#9c85ef",
        backgroundImage: `url(${backgroundImage || ""})`,
    };

    return (
        <Card className={cl("card", "card-special")} style={cardStyle}>
            <div className={cl("card-flex")}>
                <div className={cl("card-flex-main")}>
                    <Heading className={cl("title")} tag="h5">{title}</Heading>
                    <Paragraph className={cl("subtitle")}>{subtitle}</Paragraph>
                    <Paragraph className={cl("text")}>{description}</Paragraph>

                    {children}
                </div>
                {cardImage && (
                    <div className={cl("image-container")}>
                        <img
                            role="presentation"
                            src={cardImage}
                            alt=""
                            className={cl("image")}
                        />
                    </div>
                )}
            </div>
            {buttonTitle && (
                <>
                    <Divider className={cl("seperator")} />
                    <Clickable onClick={onClick} className={cl("hyperlink")}>
                        <Paragraph className={cl("hyperlink-text")}>
                            {buttonTitle}
                        </Paragraph>
                    </Clickable>
                </>
            )}
        </Card>
    );
}

/**
 * Crisp pixel art drawn from rows of characters. Each character maps
 * to a colour in `palette`; "." is transparent.
 */
export function PixelArt({ rows, palette, pixel = 5, style }: { rows: string[]; palette: Record<string, string>; pixel?: number; style?: CSSProperties; }) {
    const width = Math.max(...rows.map(r => r.length));
    const rects: ReactNode[] = [];
    rows.forEach((row, y) => {
        for (let x = 0; x < row.length; x++) {
            const fill = palette[row[x]];
            if (fill) rects.push(<rect key={`${x}-${y}`} x={x} y={y} width={1.02} height={1.02} fill={fill} />);
        }
    });
    return (
        <svg
            className="ec-card-pixel-art"
            width={width * pixel}
            height={rows.length * pixel}
            viewBox={`0 0 ${width} ${rows.length}`}
            shapeRendering="crispEdges"
            style={style}
        >
            {rects}
        </svg>
    );
}

// The sleeping panda mascot
export const PANDA_ROWS = [
    "..kkk.......kkk..",
    ".kKKKk.....kKKKk.",
    ".KKKKKWWWWWKKKKK.",
    "..KKKWWWWWWWKKK..",
    "..WWWWWWWWWWWWW..",
    ".WWWWWWWWWWWWWWw.",
    ".WWKKKWWWWWKKKWw.",
    "WWKKEKKWWWKKEKKWw",
    "WWKKKKKWWWKKKKKWw",
    "WWWKKKWWWWWKKKWWw",
    "WWPPWWWKKKWWWPPWw",
    "WWPPWWWWKWWWWPPWw",
    ".WWWWWWKWKWWWWWw.",
    "..WWWWWWWWWWWWw..",
    "...wWWWWWWWWWw...",
    ".....wwwwwww.....",
];
// The fur is a shade lighter than the card and the ears have a rim light, so the silhouette reads on dark blue
export const PANDA_PALETTE = { K: "#232C40", k: "#4A5A80", W: "#F3F6FB", w: "#C9D3E4", E: "#FFFFFF", P: "#F4A6B8" };

export const HEART_ROWS = [
    ".HH...HH.",
    "HLHH.HHHH",
    "HLHHHHHHH",
    "HHHHHHHHH",
    ".HHHHHHH.",
    "..HHHHH..",
    "...HHH...",
    "....H....",
];
export const HEART_PALETTE = { H: "#F0776B", L: "#F8B4AC" };
