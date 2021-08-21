/**
 * @property {object} role
 * @property {array} role.abilities
 */
class User {
  can(ability) {
    return this.role.abilities.includes(ability);
  }
}

export default User;
