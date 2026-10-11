/*
 * FluxCord, a modification for Discord's desktop app
 * Copyright (c) 2026 FluxCord contributors
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

/**
 * The FluxCord mark, inlined as a data URI so badges render without depending
 * on any hosted asset. Keep in sync with EquicordIcon in components/Icons.tsx.
 */
export const FLUXCORD_MARK =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E" +
    "%3Crect width='24' height='24' fill='%235865f2'/%3E%3Cpath fill='%23fff' " +
    "d='M14 1.5L4.5 13.8h5.6L8.5 22.5L19.5 10.2h-5.6L14 1.5Z'/%3E%3C/svg%3E";
