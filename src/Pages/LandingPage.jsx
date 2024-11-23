
import { useContext } from "react";
import Layout from "../Component/Layout";
import VoiceWaveLines from "../Component/VoiceWaveLines";
import { UserContext } from "../Component/Context/Userprovider";

const LandingPage = () => {
  const {isRecording} = useContext(UserContext)
  return (
    <>
    <Layout>
      <div className="mt-0 md:mt-0">
        <VoiceWaveLines isRecording={isRecording}/>
        </div> 
    </Layout>
      
    </>
  );
};

export default LandingPage;
