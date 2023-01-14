const Canvas = require('canvas');
const fs = require('fs');
const playerCols = require('../types/gdCol.js');
module.exports = async (iconID, form, col1, col2, glowCol) => {
    const iconPath = `./assets/gd/icons/${form}/${iconID}`;
    let base = await Canvas.loadImage(`${iconPath}/Base.png`);
    let primary = await Canvas.loadImage(`${iconPath}/Primary.png`);
    let secondary = await Canvas.loadImage(`${iconPath}/Secondary.png`);
    let glow = await Canvas.loadImage(`${iconPath}/Glow.png`);
    let outline = await Canvas.loadImage(`${iconPath}/Outline.png`);
    let canvas = Canvas.createCanvas(base.width, base.height);
    let ctx = canvas.getContext('2d');

    drawLayer(ctx, primary, playerCols[col1]);
    drawLayer(ctx, secondary, playerCols[col2]);
    drawLayer(ctx, glow, playerCols[glowCol]);
    ctx.drawImage(outline, 0, 0, canvas.width, canvas.height);
    return canvas;
};

function drawLayer(ctx, image, color) {
    let buffer = drawTintedImage(image, color);
    ctx.drawImage(image, 0, 0, image.width, image.height);
    ctx.drawImage(buffer, 0, 0, image.width, image.height);
}

function drawTintedImage(image, color) {
    color = hexToRGB(color);
    buff = Canvas.createCanvas(image.width, image.height);
    btx = buff.getContext('2d');
    recolorImageComp(btx, image, color);
    return buff;
}

function recolorImageData(ctx, image, rgb) {
    btx.drawImage(image, 0, 0, image.width, image.height);
    let imageData = btx.getImageData(0, 0, image.width, image.height);
    for (let i = 0; i < imageData.data.length; i += 4) {
        imageData.data[i] = rgb[0];
        imageData.data[i + 1] = rgb[1];
        imageData.data[i + 2] = rgb[2];
    };
    btx.putImageData(imageData, 0, 0);
};

function recolorImageComp(ctx, image, rgb) {
    ctx.fillStyle = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
    ctx.fillRect(0, 0, image.width, image.height);
    ctx.globalCompositeOperation = 'destination-in';
    ctx.drawImage(image, 0, 0, image.width, image.height);
    ctx.globalCompositeOperation = 'source-over';
}

function hexToRGB(hex) {
    return [parseInt(hex.slice(1, 3), 16), parseInt(hex.slice(3, 5), 16), parseInt(hex.slice(5, 7), 16)];
}