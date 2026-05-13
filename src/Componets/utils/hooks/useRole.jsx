import useAuth from "./useAuth";

const useRole = () => {
  const { user } = useAuth();

//   console.log("from userRole",user);

  const role = user?.role || "user";

//   console.log("role",role)

  return role;
};

export default useRole;
