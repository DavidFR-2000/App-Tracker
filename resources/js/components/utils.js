export const ddragonImageUrl = (type, id, version = '14.11.1') => {
    // Asume que 'type' puede ser 'champion', 'item', 'profileicon', etc.
    return `/ddragon/${version}/img/${type}/${id}.png`;
};

export const ddragonRankedEmblemUrl = (tier, version = '14.11.1') => {
    // Asume que las imágenes están en `img/ranked-emblems/` dentro de la versión correspondiente
    return `/ddragon/${version}/img/ranked-emblems/${tier}.png`;
};

