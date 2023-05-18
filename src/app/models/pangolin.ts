export default class Pangolin {
    _id!: any;
    name!: string;
    role!: Role;
    email!: string;
    friends?: PangolinFriend[] | undefined;
}

export class PangolinFriend {
    _id!: any;
    name!: string;
    role!: string;
    email!: string;
}

export enum Role {
    guerrier = 'Guerrier',
    alchimiste = 'Alchimiste',
    sorcier = 'Sorcier',
    espions = 'Espions',
    enchanteur = 'Enchanteur'
}