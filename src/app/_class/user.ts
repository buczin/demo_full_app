export class User {
    id: number;
    username: string;
    password: string;
    name: string;
    authdata: User;
  authorities: any;

  catalogRead: boolean;
  catalogWrite: boolean;
  catalogDelete: boolean;
  systemRead: boolean;
  systemWrite: boolean;
  systemDelete: boolean;
  filmRead: boolean;
  filmWrite: boolean;
  filmDelete: boolean;
  clientRead: boolean;
  clientWrite: boolean;
  clientDelete: boolean;
  producerRead: boolean;
  producerWrite: boolean;
  producerDelete: boolean;
  offerRead: boolean;
  offerDelete: boolean;
  offerWrite: boolean;
  productionRead: boolean;
  productionDelete: boolean;
  productionWrite: boolean;
}