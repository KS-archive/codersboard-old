export default (prisma, permissions) => {
  const { user } = prisma.request;
  if (!user) return false;

  return user.permissions.some(permission => permissions.includes(permission));
}
