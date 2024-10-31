// src/controllers/PermissionController.js
const util = require("util");
const ApkReader = require("adbkit-apkreader");
const path = require("path");
const fs = require("fs");
const os = require("os");
const crypto = require("crypto");

const permission = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({
          status: "false",
          message: "No se ha recibido ningún archivo APK.",
        });
    }

    const apkBuffer = req.file.buffer;

    const tempFileName = `temp-${crypto.randomBytes(16).toString("hex")}.apk`;
    const tempFilePath = path.join(os.tmpdir(), tempFileName);

    await fs.promises.writeFile(tempFilePath, apkBuffer);

    const reader = await ApkReader.open(tempFilePath);
    const manifest = await reader.readManifest();

    const permissionsArray = manifest["usesPermissions"] || [];
    const permissions = permissionsArray.map(
      (permission) => permission["name"]
    );

    await fs.promises.unlink(tempFilePath);

    res.status(200).json({ permissions });
  } catch (error) {
    res.status(500).json({ message: "Error al parsear el APK." });
  }
};

module.exports = {
  permission,
};
