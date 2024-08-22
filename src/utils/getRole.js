export default function getRole(role) {
  let roleName;
  if (role === 6000) {
    roleName = "Super Admin";
  } else if (role === 5150) {
    roleName = "Admin";
  } else if (role === 1984) {
    roleName = "Editor";
  } else if (role === 2001) {
    roleName = "User";
  }

  return roleName;
}
