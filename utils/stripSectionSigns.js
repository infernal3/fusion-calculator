var stripSectionSigns = function (string) {
    return string.replaceAll(/\u00a7[0-9a-fA-F]/, "");
};
