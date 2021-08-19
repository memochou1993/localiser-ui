class Project {
  allow(ability) {
    return this.role.abilities.includes(ability);
  }
}

export default Project;
