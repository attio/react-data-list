export interface MiddleEarthCharacter {
    name: string
    race: string
    url: string
}

export const MIDDLE_EARTH_THE_FELLOWSHIP = [
    {
        name: "Frodo",
        race: "Hobbit",
        url: "https://static.wikia.nocookie.net/lotr/images/3/32/Frodo_%28FotR%29.png/revision/latest",
    },
    {
        name: "Sam",
        race: "Hobbit",
        url: "https://static.wikia.nocookie.net/lotr/images/5/52/Samwise_Gamgee_1.PNG/revision/latest",
    },
    {
        name: "Merry",
        race: "Hobbit",
        url: "https://static.wikia.nocookie.net/lotr/images/b/b9/Merry.jpg/revision/latest",
    },
    {
        name: "Pippin",
        race: "Hobbit",
        url: "https://static.wikia.nocookie.net/lotr/images/8/8f/Pippin_Took_profile.jpg/revision/latest",
    },
    {
        name: "Aragorn",
        race: "Human",
        url: "https://static.wikia.nocookie.net/lotr/images/8/84/Aragorn11.jpg/revision/latest",
    },
    {
        name: "Boromir",
        race: "Human",
        url: "https://static.wikia.nocookie.net/lotr/images/a/ae/Boromir34_b.jpg/revision/latest",
    },
    {
        name: "Legolas",
        race: "Elf",
        url: "https://static.wikia.nocookie.net/lotr/images/9/95/Legolask.jpg/revision/latest",
    },
    {
        name: "Gimli",
        race: "Dwarf",
        url: "https://static.wikia.nocookie.net/lotr/images/4/43/Gimli.jpg/revision/latest",
    },
    {
        name: "Gandalf",
        race: "Wizard",
        url: "https://static.wikia.nocookie.net/lotr/images/4/47/Gandalf_by_Damiani.png/revision/latest",
    },
] as const satisfies ReadonlyArray<MiddleEarthCharacter>
