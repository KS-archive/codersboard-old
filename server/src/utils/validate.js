class Validate {
  constructor(ctx) {
    this.ctx = ctx;
  }

  userExist() {
    if (!this.ctx.request.userId) {
      throw new Error('You must be logged in');
    }
    return this;
  }

  async userHasPermission(permissionsNeeded) {
    const user = await this.ctx.prisma.query.user(
      { where: { id: this.ctx.request.userId } },
      '{ permissions }',
    );

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
