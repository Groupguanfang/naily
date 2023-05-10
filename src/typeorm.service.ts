import { Injectable } from "./main";

export enum TYPEORM_KEY {
  injecter = "typeorm_inject",
}

export const InjectRepository = (entity: Function): PropertyDecorator => {
  return (target, propertyKey) => {
    Reflect.defineMetadata(
      TYPEORM_KEY.injecter,
      {
        key: propertyKey,
        entity,
      },
      target
    );
  };
};

@Injectable
export class TypeORMService {}
