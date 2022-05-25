const EditProfileForm = ({ user, setUser }) => {

    return (
        <form>
            <h3>Edit Profile Form</h3>
            <p>{ user.name }</p>
        </form>
    );
};

export default EditProfileForm;
