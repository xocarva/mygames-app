import { EditProfileForm } from "../../../components";
import { useSetUser, useUser } from "../../../hooks";

const EditProfile = () => {

    const user = useUser();
    const setUser = useSetUser();

    return (
        <main>
            <h1>Edit Profile</h1>
            <EditProfileForm user={ user.data } setUser={ setUser }/>
        </main>
    );

};

export default EditProfile;
