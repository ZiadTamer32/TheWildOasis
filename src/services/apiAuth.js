import supabase, { supabaseUrl } from "./supabase";

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    throw new Error(error.message);
  }
  return data?.user;
}
export async function logout() {
  let { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
}

export async function SignUp({ fullName, email, password }) {
  let { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { fullName, avatar: "" } }
  });
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function updateUserApi({ fullName, password, avatar }) {
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };
  const { data, error } = await supabase.auth.updateUser(updateData);
  if (!avatar) return data;

  if (error) {
    throw new Error(error.message);
  }

  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  // Upload the Avatar Image
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) {
    throw new Error(storageError.message);
  }
  //  update in the user
  const imagePath = `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`;
  const { data: updateUser, error: UpdateErrorUser } =
    await supabase.auth.updateUser({ data: { avatar: imagePath } });
  if (UpdateErrorUser) {
    throw new Error(UpdateErrorUser.message);
  }
  return updateUser;
}
// export async function updatePassword({ password }) {
//   const { data, error } = await supabase.auth.updateUser({
//     password
//   });
//   if (error) {
//     throw new Error(error.message);
//   }
//   console.log(data);
//   return data;
// }
