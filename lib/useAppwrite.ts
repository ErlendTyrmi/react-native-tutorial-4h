import { useEffect, useState } from "react";
import { Models } from "react-native-appwrite";
import { Alert } from "react-native";

const useAppwrite = (fn: { (): Promise<Models.Document[]>; (): any }) => {
  const [data, setdata] = useState<Models.Document[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetch = async () => {
    setIsLoading(true);
    try {
      const response = await fn();
      setdata(response);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", (error as any).message ?? "Loading videos failed.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const refetch = () => fetch();

  return { data, isLoading, refetch };
};

export default useAppwrite;
