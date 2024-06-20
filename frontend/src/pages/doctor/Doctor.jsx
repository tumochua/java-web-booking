import { useEffect } from "react";
import Scene from "../Scene";
import { apiGetProfile } from "../../services/doctorService";

function Doctor() {

    useEffect(() => {
        try {
            (async () => {
                const res = await apiGetProfile()
                console.log(res);
            })()
        } catch (error) {
            console.log(error);
        }
    }, [])

    return (
        <Scene>
            {/* <TimePicker /> */}
        </Scene>
    );
}

export default Doctor;