/*
 * Vencord, a Discord client mod
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { deflateSync } from "node:zlib";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const INSTALLER_DIR = join(ROOT, "installer");
const PACK_DIR = join(ROOT, "assets", "discord");
const RELEASES_DIR = join(PACK_DIR, "releases");

const P = {
    0: null,
    1: [10, 14, 28],
    2: [245, 200, 90],
    3: [201, 144, 42],
    4: [255, 233, 176],
    5: [255, 217, 130],
    6: [217, 156, 48],
    7: [255, 243, 208],
    8: [232, 118, 58],
    9: [201, 90, 36],
    10: [247, 240, 226],
    11: [232, 179, 61],
    12: [247, 207, 116],
    13: [255, 255, 255],
};
const INK = 1, FACE_F = 2, SIDE_F = 3, HIL_F = 4;
const FACE_C = 5, SIDE_C = 6, HIL_C = 7;
const FOX = 8, FOX_D = 9, CREAM = 10, GOLD = 11, LGOLD = 12, WHITE = 13;

const INK_RGB = [13, 18, 38];
const LIGHT_RGB = [20, 27, 51];
const LIGHT2_RGB = [26, 35, 66];
const GOLD_RGB = [232, 179, 61];

const GRID = 100, SCALE = 5, SIZE = GRID * SCALE;

function renderMask(g, W, H, mask, face, side, hil, bands) {
    const has = i => mask.has(i);
    for (const i of mask) {
        const x = i % W, y = (i / W) | 0;
        for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
            const nx = x + dx, ny = y + dy;
            if (nx < 0 || nx >= W || ny < 0 || ny >= H) continue;
            const ni = ny * W + nx;
            if (!mask.has(ni)) g[ni] = INK;
        }
    }
    for (const i of mask) g[i] = face;
    if (!bands) return;
    for (const i of mask) {
        const x = i % W, y = (i / W) | 0;
        if (y === 0 || !has((y - 1) * W + x)) g[i] = hil;
        else if (x === 0 || !has(y * W + x - 1)) g[i] = hil;
        else if (y === H - 1 || !has((y + 1) * W + x)) g[i] = side;
        else if (x === W - 1 || !has(y * W + x + 1)) g[i] = side;
    }
}

function rectMask(W, rects) {
    const m = new Set();
    for (const [x, y, w, h] of rects)
        for (let yy = y; yy < y + h; yy++)
            for (let xx = x; xx < x + w; xx++) m.add(yy * W + xx);
    return m;
}

const F_RECTS = [[31, 44, 6, 26], [31, 44, 18, 6], [31, 53, 15, 6]];
const C_RECTS = [[46, 44, 6, 26], [50, 44, 14, 6], [50, 64, 14, 6]];

const FOX_ART = [
    ".....DD.........DD......",
    "....DDDD........DDDD....",
    "....DOOOD......DOOOD....",
    "....DOOOOOOOOOOOOOOD....",
    "...OOOOOOOOOOOOOOOOOO...",
    "..OOOOOOOOOOOOOOOOOOOO..",
    "..OOOOOOOOOOOOOOOOOOOO..",
    "..OOOOXXXOOOOOOXXXOOOO..",
    "..OOOOOOCCCXXCCCOOOOOO..",
    "..OOOOOCCCCCCCCCCCCOOO..",
    "..OOOOOOCCCXXCCCOOOOOO..",
    "...OOOOOOCCCCCCOOOOOO...",
    "...OOOOOOOCCCCOOOOOOO...",
    ".OOOOOCCCCOOCCCCOOOOO...",
    "..OOOCCCCOOCCCCOOO......",
    "...OOOCCOOOOCCOOO.......",
    ".....OOOOOOOOOO.........",
    "........................",
];
for (const row of FOX_ART) if (row.length !== 24) throw new Error(`Fox art row is ${row.length} characters, expected 24`);

function paintFox(g, W, H, ox, oy) {
    const fill = new Set();
    for (let r = 0; r < FOX_ART.length; r++) for (let c = 0; c < 24; c++) {
        const ch = FOX_ART[r][c];
        if (ch === ".") continue;
        const x = ox + c, y = oy + r;
        if (x < 0 || x >= W || y < 0 || y >= H) continue;
        const i = y * W + x;
        fill.add(i);
        g[i] = ch === "O" ? FOX : ch === "D" ? FOX_D : ch === "C" ? CREAM : INK;
    }
    for (const i of fill) {
        const x = i % W, y = (i / W) | 0;
        for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
            const nx = x + dx, ny = y + dy;
            if (nx < 0 || nx >= W || ny < 0 || ny >= H) continue;
            const ni = ny * W + nx;
            if (!fill.has(ni)) g[ni] = INK;
        }
    }
}

function drawZ(g, W, x, y, color) {
    const Z = ["XXXX", "..X.", ".X..", "XXXX"];
    for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++)
        if (Z[r][c] === "X") g[(y + r) * W + x + c] = color;
}

function buildLetters() {
    const g = new Uint8Array(GRID * GRID);
    renderMask(g, GRID, GRID, rectMask(GRID, F_RECTS), FACE_F, SIDE_F, HIL_F, true);
    renderMask(g, GRID, GRID, rectMask(GRID, C_RECTS), FACE_C, SIDE_C, HIL_C, true);
    return g;
}

function buildCluster(withZzz) {
    const g = buildLetters();
    paintFox(g, GRID, GRID, 40, 27);
    if (withZzz) {
        drawZ(g, GRID, 63, 25, GOLD);
        drawZ(g, GRID, 68, 22, GOLD);
        drawZ(g, GRID, 72, 19, LGOLD);
    }
    return g;
}

function addDecor(g) {
    const set = (x, y, v) => { if (x >= 0 && x < GRID && y >= 0 && y < GRID) g[y * GRID + x] = v; };
    const decor = [];
    const bar = (x, y, w, c) => decor.push([x, y, w, 1, c]);
    const dot = (x, y, c) => decor.push([x, y, 2, 2, c]);
    const plus = (x, y, c) => { decor.push([x - 1, y, 3, 1, c]); decor.push([x, y - 1, 1, 3, c]); };
    const sparkle = (x, y, c) => { decor.push([x, y - 1, 1, 3, c]); decor.push([x - 1, y, 3, 1, c]); };

    bar(1, 45, 9, INK);
    bar(3, 46, 5, INK);
    bar(0, 48, 8, INK);
    bar(10, 49, 8, INK);
    bar(0, 51, 11, INK);
    bar(13, 52, 6, GOLD);
    bar(20, 47, 6, LGOLD);
    bar(4, 55, 7, INK);
    bar(15, 56, 4, GOLD);
    bar(22, 58, 5, INK);
    bar(7, 61, 6, LGOLD);
    plus(6, 42, GOLD);
    plus(25, 43, INK);
    dot(14, 44, GOLD);
    dot(19, 62, LGOLD);
    sparkle(3, 58, WHITE);
    sparkle(26, 51, WHITE);
    dot(10, 64, INK);
    plus(17, 65, INK);
    dot(0, 43, INK);
    bar(26, 63, 3, GOLD);

    for (const [x, y, w, h, c] of decor.slice())
        decor.push([99 - (x + w - 1), y, w, h, c]);
    for (const [x, y, w, h, c] of decor)
        for (let yy = 0; yy < h; yy++) for (let xx = 0; xx < w; xx++) set(x + xx, y + yy, c);
}

function buildWordmark() {
    const G = {
        F: ["#####", "#....", "#....", "####.", "#....", "#....", "#...."],
        L: ["#....", "#....", "#....", "#....", "#....", "#....", "#####"],
        U: ["#...#", "#...#", "#...#", "#...#", "#...#", "#...#", "#####"],
        X: ["#...#", "#...#", ".#.#.", "..#..", ".#.#.", "#...#", "#...#"],
        C: [".###.", "#...#", "#....", "#....", "#....", "#...#", ".###."],
        O: [".###.", "#...#", "#...#", "#...#", "#...#", "#...#", ".###."],
        R: ["####.", "#...#", "#...#", "####.", "#.#..", "#..#.", "#...#"],
        D: ["####.", "#...#", "#...#", "#...#", "#...#", "#...#", "####."],
    };
    const text = "FLUXCORD";
    const W = text.length * 5 + (text.length - 1), H = 7;
    const g = new Uint8Array(W * H);
    const mask = new Set();
    let col = 0;
    for (const ch of text) {
        const glyph = G[ch];
        if (!glyph) throw new Error(`No glyph for "${ch}"`);
        for (let r = 0; r < 7; r++) for (let c = 0; c < 5; c++)
            if (glyph[r][c] === "#") mask.add(r * W + col + c);
        col += 6;
    }
    renderMask(g, W, H, mask, FACE_C, SIDE_C, HIL_C, false);
    return { g, W, H };
}

function buildFoxStandalone() {
    const W = 30, H = 24;
    const g = new Uint8Array(W * H);
    paintFox(g, W, H, 3, 3);
    return { g, W, H };
}

function bbox(g, W, H) {
    let minX = W, minY = H, maxX = -1, maxY = -1;
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++)
        if (g[y * W + x]) {
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
        }
    if (maxX < 0) throw new Error("Empty art, nothing to crop");
    return { minX, minY, maxX, maxY, w: maxX - minX + 1, h: maxY - minY + 1 };
}

function crop(g, W, bb) {
    const out = new Uint8Array(bb.w * bb.h);
    for (let y = 0; y < bb.h; y++) for (let x = 0; x < bb.w; x++)
        out[y * bb.w + x] = g[(bb.minY + y) * W + bb.minX + x];
    return { g: out, W: bb.w, H: bb.h };
}

function crc32(buf) {
    let c, table = crc32.t;
    if (!table) {
        table = crc32.t = new Int32Array(256);
        for (let n = 0; n < 256; n++) { c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; table[n] = c; }
    }
    c = -1;
    for (let i = 0; i < buf.length; i++) c = table[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
    return (c ^ -1) >>> 0;
}

function chunk(type, data) {
    const b = Buffer.alloc(8 + data.length + 4);
    b.writeUInt32BE(data.length, 0);
    b.write(type, 4, "ascii");
    data.copy(b, 8);
    b.writeUInt32BE(crc32(Buffer.concat([Buffer.from(type, "ascii"), data])), 8 + data.length);
    return b;
}

function encodePng(width, height, rgba) {
    const sig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
    const ihdr = Buffer.alloc(13);
    ihdr.writeUInt32BE(width, 0);
    ihdr.writeUInt32BE(height, 4);
    ihdr[8] = 8;
    ihdr[9] = 6;
    const stride = width * 4;
    const raw = Buffer.alloc((stride + 1) * height);
    for (let y = 0; y < height; y++) {
        raw[y * (stride + 1)] = 0;
        rgba.copy(raw, y * (stride + 1) + 1, y * stride, (y + 1) * stride);
    }
    return Buffer.concat([sig, chunk("IHDR", ihdr), chunk("IDAT", deflateSync(raw, { level: 9 })), chunk("IEND", Buffer.alloc(0))]);
}

function gridToRGBA(g, W, H, scale) {
    const out = Buffer.alloc(W * scale * H * scale * 4);
    const OW = W * scale;
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
        const c = P[g[y * W + x]];
        if (!c) continue;
        for (let sy = 0; sy < scale; sy++) for (let sx = 0; sx < scale; sx++) {
            const i = ((y * scale + sy) * OW + x * scale + sx) * 4;
            out[i] = c[0];
            out[i + 1] = c[1];
            out[i + 2] = c[2];
            out[i + 3] = 255;
        }
    }
    return out;
}

function fillRect(cv, W, H, x, y, w, h, rgb) {
    for (let yy = Math.max(0, y); yy < Math.min(H, y + h); yy++)
        for (let xx = Math.max(0, x); xx < Math.min(W, x + w); xx++) {
            const i = (yy * W + xx) * 4;
            cv[i] = rgb[0];
            cv[i + 1] = rgb[1];
            cv[i + 2] = rgb[2];
            cv[i + 3] = 255;
        }
}

function blit(dst, dW, dH, src, sW, sH, ox, oy) {
    for (let y = 0; y < sH; y++) for (let x = 0; x < sW; x++) {
        const dx = ox + x, dy = oy + y;
        if (dx < 0 || dx >= dW || dy < 0 || dy >= dH) continue;
        const si = (y * sW + x) * 4;
        if (src[si + 3] === 0) continue;
        const di = (dy * dW + dx) * 4;
        dst[di] = src[si];
        dst[di + 1] = src[si + 1];
        dst[di + 2] = src[si + 2];
        dst[di + 3] = 255;
    }
}

function bgPattern(cv, W, H) {
    fillRect(cv, W, H, 0, 0, W, H, INK_RGB);
    const T = 88;
    for (let ty = 0; ty * T < H + T; ty++) for (let tx = 0; tx * T < W + T; tx++) {
        const v = (tx * 5 + ty * 3) % 6;
        const x = tx * T + 8 + (tx * 37 + ty * 17) % 48;
        const y = ty * T + 8 + (tx * 23 + ty * 41) % 48;
        if (v === 0) fillRect(cv, W, H, x, y, 20, 2, LIGHT_RGB);
        else if (v === 1) { fillRect(cv, W, H, x, y, 12, 2, LIGHT2_RGB); fillRect(cv, W, H, x + 5, y - 5, 2, 12, LIGHT2_RGB); }
        else if (v === 2) fillRect(cv, W, H, x, y, 4, 4, LIGHT_RGB);
        else if (v === 3) fillRect(cv, W, H, x, y, 12, 2, LIGHT2_RGB);
        else if (v === 4) { fillRect(cv, W, H, x, y, 2, 2, LIGHT_RGB); fillRect(cv, W, H, x + 10, y + 6, 2, 2, LIGHT2_RGB); }
    }
}

function ring(cv, W, H, cx, cy, R, th, rgb) {
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
        const d = Math.hypot(x + 0.5 - cx, y + 0.5 - cy);
        if (Math.abs(d - R) <= th / 2) {
            const i = (y * W + x) * 4;
            cv[i] = rgb[0];
            cv[i + 1] = rgb[1];
            cv[i + 2] = rgb[2];
            cv[i + 3] = 255;
        }
    }
}

function installerLogo() {
    const g = buildCluster(true);
    addDecor(g);
    const img = gridToRGBA(g, GRID, GRID, SCALE);
    const png = encodePng(SIZE, SIZE, img);

    const N = 256;
    const small = Buffer.alloc(N * N * 4);
    for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
        const x0 = Math.floor(x * SIZE / N), x1 = Math.floor((x + 1) * SIZE / N);
        const y0 = Math.floor(y * SIZE / N), y1 = Math.floor((y + 1) * SIZE / N);
        let r = 0, gg = 0, b = 0, a = 0, n = 0;
        for (let yy = y0; yy < y1; yy++) for (let xx = x0; xx < x1; xx++) {
            const i = (yy * SIZE + xx) * 4;
            const al = img[i + 3];
            r += img[i] * al;
            gg += img[i + 1] * al;
            b += img[i + 2] * al;
            a += al;
            n++;
        }
        const i = (y * N + x) * 4;
        if (a > 0) {
            small[i] = r / a;
            small[i + 1] = gg / a;
            small[i + 2] = b / a;
            small[i + 3] = a / n;
        }
    }
    const png256 = encodePng(N, N, small);
    const ico = Buffer.alloc(22 + png256.length);
    ico.writeUInt16LE(0, 0);
    ico.writeUInt16LE(1, 2);
    ico.writeUInt16LE(1, 4);
    ico.writeUInt16LE(1, 10);
    ico.writeUInt16LE(32, 12);
    ico.writeUInt32LE(png256.length, 14);
    ico.writeUInt32LE(22, 18);
    png256.copy(ico, 22);

    return { png, ico };
}

function packAssets() {
    const files = new Map();

    const cluster = buildCluster(true);
    const clusterBB = bbox(cluster, GRID, GRID);
    const clusterCrop = crop(cluster, GRID, clusterBB);

    const full = buildCluster(true);
    addDecor(full);

    const word = buildWordmark();
    const fox = buildFoxStandalone();
    const foxBB = bbox(fox.g, fox.W, fox.H);
    const foxCrop = crop(fox.g, fox.W, foxBB);

    const seal = (name, grid, s) => {
        const W = 512, H = 512, cv = Buffer.alloc(W * H * 4);
        bgPattern(cv, W, H);
        ring(cv, W, H, 256, 256, 250, 3, GOLD_RGB);
        ring(cv, W, H, 256, 256, 237, 8, GOLD_RGB);
        const bb = bbox(grid, GRID, GRID);
        const cr = crop(grid, GRID, bb);
        blit(cv, W, H, gridToRGBA(cr.g, cr.W, cr.H, s), cr.W * s, cr.H * s, Math.round((W - cr.W * s) / 2), Math.round((H - cr.H * s) / 2));
        files.set(name, encodePng(W, H, cv));
    };

    const lettersZzz = buildLetters();
    drawZ(lettersZzz, GRID, 58, 36, GOLD);
    drawZ(lettersZzz, GRID, 63, 33, GOLD);
    drawZ(lettersZzz, GRID, 67, 30, LGOLD);

    seal("FluxCord-ServerIcon-512.png", buildCluster(false), 8);
    seal("FluxCord-ServerIcon-512-NoFox.png", buildLetters(), 10);
    seal("FluxCord-ServerIcon-512-NoFox-Zzz.png", lettersZzz, 8);

    {
        const art = gridToRGBA(full, GRID, GRID, 5);
        const cv = Buffer.alloc(512 * 512 * 4);
        blit(cv, 512, 512, art, 500, 500, 6, 6);
        files.set("FluxCord-ServerIcon-Clear-512.png", encodePng(512, 512, cv));
    }

    const stackAsset = (name, W, H, clusterScale, wordScale, gap) => {
        const cv = Buffer.alloc(W * H * 4);
        bgPattern(cv, W, H);
        const cw = clusterCrop.W * clusterScale, ch = clusterCrop.H * clusterScale;
        const ww = word.W * wordScale, wh = word.H * wordScale;
        const top = Math.round((H - (ch + gap + wh)) / 2);
        blit(cv, W, H, gridToRGBA(clusterCrop.g, clusterCrop.W, clusterCrop.H, clusterScale), cw, ch, Math.round((W - cw) / 2), top);
        blit(cv, W, H, gridToRGBA(word.g, word.W, word.H, wordScale), ww, wh, Math.round((W - ww) / 2), top + ch + gap);
        files.set(name, encodePng(W, H, cv));
    };

    stackAsset("FluxCord-ServerBanner-960x540.png", 960, 540, 6, 7, 18);
    stackAsset("FluxCord-InviteSplash-1920x1080.png", 1920, 1080, 9, 12, 36);

    {
        const W = 600, H = 240, cv = Buffer.alloc(W * H * 4);
        bgPattern(cv, W, H);
        const cs = 3, ws = 5;
        const cw = clusterCrop.W * cs, ch = clusterCrop.H * cs;
        const ww = word.W * ws, wh = word.H * ws;
        const x0 = Math.round((W - (cw + 18 + ww)) / 2);
        blit(cv, W, H, gridToRGBA(clusterCrop.g, clusterCrop.W, clusterCrop.H, cs), cw, ch, x0, Math.round((H - ch) / 2));
        blit(cv, W, H, gridToRGBA(word.g, word.W, word.H, ws), ww, wh, x0 + cw + 18, Math.round((H - wh) / 2));
        files.set("FluxCord-ProfileBanner-600x240.png", encodePng(W, H, cv));
    }

    {
        const W = 128, H = 128, cv = Buffer.alloc(W * H * 4);
        const s = 5;
        const fw = foxCrop.W * s, fh = foxCrop.H * s;
        blit(cv, W, H, gridToRGBA(foxCrop.g, foxCrop.W, foxCrop.H, s), fw, fh, Math.round((W - fw) / 2), Math.round((H - fh) / 2));
        files.set("FluxCord-Emoji-Fox-128.png", encodePng(W, H, cv));
    }

    {
        const s = 8, pad = 8;
        const art = gridToRGBA(word.g, word.W, word.H, s);
        const W = word.W * s + pad * 2, H = word.H * s + pad * 2;
        const cv = Buffer.alloc(W * H * 4);
        blit(cv, W, H, art, word.W * s, word.H * s, pad, pad);
        files.set("FluxCord-Wordmark-Clear.png", encodePng(W, H, cv));
    }

    return files;
}

function write(path, buf) {
    const changed = !existsSync(path) || !readFileSync(path).equals(buf);
    writeFileSync(path, buf);
    console.log(`  [${changed ? "changed" : "same   "}] ${path.startsWith(ROOT) ? path.slice(ROOT.length).replace(/^[/\\]/, "") : path}`);
    return changed;
}

function main() {
    const args = process.argv.slice(2);
    const release = args.includes("--release");
    const tagIdx = args.indexOf("--tag");
    const pkg = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8"));
    const tag = tagIdx >= 0 ? args[tagIdx + 1] : `v${pkg.version}`;

    console.log("Installer logo");
    const { png, ico } = installerLogo();
    write(join(INSTALLER_DIR, "app_logo.png"), png);
    write(join(INSTALLER_DIR, "app_icon.ico"), ico);

    console.log("Discord pack");
    const files = packAssets();
    for (const [name, buf] of files) write(join(PACK_DIR, name), buf);

    if (release) {
        console.log(`Release snapshot ${tag}`);
        const dir = join(RELEASES_DIR, tag);
        mkdirSync(dir, { recursive: true });
        for (const [name, buf] of files) write(join(dir, name), buf);
    }
}

main();
