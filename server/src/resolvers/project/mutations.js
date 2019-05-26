const validate = require('utils/validate');

const createProject = async (parent, args, ctx, info) => {
  await validate(ctx).userHasPermission(['OWNER']);
  return ctx.prisma.mutation.createProject(args, info);
};

const updateProject = async (parent, args, ctx, info) => {
  await validate(ctx).userHasPermission(['OWNER']);
  return ctx.prisma.mutation.updateProject(args, info);
};

const deleteProject = async (parent, args, ctx, info) => {
  await validate(ctx).userHasPermission(['OWNER']);
  return ctx.prisma.mutation.deleteProject(args, info);
};

const createProjectMember = async (parent, args, ctx, info) => {
  await validate(ctx).userHasPermission(['OWNER', 'ADMIN']);
  return ctx.prisma.mutation.createProjectMember(args, info);
};

const updateProjectMember = async (parent, args, ctx, info) => {
  await validate(ctx).userHasPermission(['OWNER', 'ADMIN']);
  return ctx.prisma.mutation.updateProjectMember(args, info);
};

const deleteProjectMember = async (parent, args, ctx, info) => {
  await validate(ctx).userHasPermission(['OWNER', 'ADMIN']);
  return ctx.prisma.mutation.deleteProjectMember(args, info);
};

module.exports = {
  createProject,
  updateProject,
  deleteProject,
  createProjectMember,
  updateProjectMember,
  deleteProjectMember,
}
