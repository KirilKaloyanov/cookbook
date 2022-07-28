import { getUserProfile } from "../../services/userService";

export function Profile() {
//demo
    async function myFunc() {
        const user = await getUserProfile();
        console.log(user);
    }

    myFunc();
    // return (
    //     <>

    //         <h2>Profile</h2>
    //     </>
    // );
}