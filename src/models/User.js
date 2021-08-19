class User {
  can(ability) {
    return this.role.abilities.includes(ability);
  }
}

export default User;
