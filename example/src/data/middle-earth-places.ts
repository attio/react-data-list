export interface MiddleEarthPlace {
    name: string
    url: string
}

export const MIDDLE_EARTH_PLACES = [
    {
        name: "Hobbiton",
        url: "https://static.wikia.nocookie.net/lotr/images/8/82/Hobbiton-BOFTA.JPG/revision/latest/scale-to-width-down/1000",
    },
    {
        name: "Bree",
        url: "https://static.wikia.nocookie.net/lotr/images/1/1a/Bree.jpg/revision/latest",
    },
    {
        name: "Rivendell",
        url: "https://static.wikia.nocookie.net/lotr/images/7/70/Jerry_Vanderstelt_-_Rivendell.jpg/revision/latest/scale-to-width-down/1000",
    },
    {
        name: "Mordor",
        url: "https://static.wikia.nocookie.net/lotr/images/0/07/Early_Mordor_-_TRoP.png/revision/latest/scale-to-width-down/1000",
    },
    {
        name: "Minas Tirith",
        url: "https://static.wikia.nocookie.net/lotr/images/e/e4/Minas_Tirith.jpg/revision/latest/scale-to-width-down/1000",
    },
    {
        name: "Rohan",
        url: "https://static.wikia.nocookie.net/lotr/images/8/8c/Golden_Hall_of_Meduseld.png/revision/latest/scale-to-width-down/1000",
    },
    {
        name: "Isengard",
        url: "https://static.wikia.nocookie.net/lotr/images/0/0c/Isengard_after.jpeg/revision/latest/scale-to-width-down/1000",
    },
    {
        name: "Lothlórien",
        url: "https://static.wikia.nocookie.net/lotr/images/e/e1/Tara_Rueping_-_Lothlorien.jpg/revision/latest",
    },
    {
        name: "Fangorn Forest",
        url: "https://static.wikia.nocookie.net/lotr/images/b/bf/Fangorn_Forest%2C_Giancola.jpg/revision/latest/scale-to-width-down/1000",
    },
    {
        name: "The Shire",
        url: "https://static.wikia.nocookie.net/lotr/images/a/af/DavidWenzelBagEnd.jpg/revision/latest/scale-to-width-down/1000",
    },
    {
        name: "Moria",
        url: "https://static.wikia.nocookie.net/lotr/images/6/61/Durin%27s_grave.jpg/revision/latest/scale-to-width-down/1000",
    },
    {
        name: "Helm's Deep",
        url: "https://static.wikia.nocookie.net/lotr/images/d/d3/Helm%27s_Deep_-_TtT.png/revision/latest/scale-to-width-down/1000",
    },
    {
        name: "Osgiliath",
        url: "https://static.wikia.nocookie.net/lotr/images/9/9a/BC1D3C88-4C27-4EEA-9973-FB4BEAF88D48.jpeg/revision/latest",
    },
    {
        name: "Weathertop",
        url: "https://static.wikia.nocookie.net/lotr/images/2/2e/Weathertop%27s_view.png/revision/latest/scale-to-width-down/1000",
    },
] as const satisfies ReadonlyArray<MiddleEarthPlace>
