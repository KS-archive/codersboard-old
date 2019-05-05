class Validate {
  constructor(ctx) {
    this.ctx = ctx;
  }

  async userExist() {
    if (!this.ctx.request.userId) {
      throw new Error('You must be logged in');
    }

    const user = await this.ctx.prisma.query.user({ where: { id: this.ctx.request.userId }});

    if (!user) {
      throw new Error('User with provided ID doesn\'t exist');
    }

    return this;
  }

  async userHasPermission(permissionsNeeded) {
    if (!this.ctx.request.userId) {
      throw new Error('You must be logged in');
    }

    const user = await this.ctx.prisma.query.user(
      { where: { id: this.ctx.request.userId } },
      '{ permissions }',
    );

    if (!user) {
      throw new Error('User with provided ID doesn\'t exist');
    }

    const matchedPermissions = user.permissions.filter(permissionTheyHave =>
      permissionsNeeded.includes(permissionTheyHave)
    );

    if (!matchedPermissions.length) {
      throw new Error(`You do not have sufficient permissions: ${permissionsNeeded}. You Have: ${user.permissions}`);
    }

    return this;
  }
}

module.exports = (ctx) => new Validate(ctx);
