// Exclude keys from user
function exclude<Entity, Key extends keyof Entity>(
  entity: Entity,
  ...keys: Key[]
): Omit<Entity, Key> {
  for (let key of keys) {
    delete entity[key];
  }
  return entity;
}

export { exclude };
