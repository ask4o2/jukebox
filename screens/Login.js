import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native";
import { View, StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import { Path, Svg } from "react-native-svg";
import { useDispatch, useSelector } from "react-redux";
import { StatusBar } from "expo-status-bar";
import tw from "twrnc";
import { Image } from "react-native";
import { ScrollView } from "react-native";
import InputField from "../components/InputField";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { TouchableOpacity } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useEffect } from "react";
import { loginUser } from "../features/user/userSlice";

const Login = ({ navigation }) => {
  const dispatch = useDispatch();

  const { height, width } = Dimensions.get("window");
  const bannerHeight = height / 2;

  const start = `0, ${height / 2}`;
  const controlPointA = `${(10 / 100) * width}, ${(80 / 100) * bannerHeight}`;
  const controlPointB = `${(90 / 100) * width}, ${(110 / 100) * bannerHeight}`;
  const end = `${width}, ${(80 / 100) * bannerHeight}`;

  const [formFields, setFormFields] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleTextChange = (newValue, fieldName) => {
    setFormFields((prevState) => ({
      ...prevState,
      [`${fieldName}`]: newValue,
    }));
  };

  // const signInUser = async () => {
  //   try {
  //     const userCredential = await signInWithEmailAndPassword(
  //       auth,
  //       formFields.email,
  //       formFields.password
  //     );
  //   } catch (error) {
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     console.log(errorMessage);
  //   }
  // };

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       dispatch(loginUser());
  //     }

  //     return unsubscribe;
  //   });
  // }, []);

  return (
    <SafeAreaView style={tw.style("flex-1")}>
      <StatusBar style="dark" translucent={true} animated={true} />
      <ScrollView style={tw.style(`bg-white`)}>
        <View>
          <View
            style={tw.style(`w-[${width}px] h-[${height / 2}px] bg-gray-400`)}
          >
            <Image
              source={require("../assets/login-banner.jpg")}
              style={tw.style("w-full h-full bg-red-300")}
            />
            <View style={tw.style("absolute bottom-0 z-10")}>
              <Svg width={width} height={height / 2}>
                <Path
                  d={`M${start} C${controlPointA} ${controlPointB} ${end} v${end}`}
                  fill={"white"}
                />
              </Svg>
            </View>
          </View>
          <View style={tw.style(`w-[${width}px] bg-white p-[18px]`)}>
            <InputField
              type={"text"}
              value={formFields.email}
              fieldName={"email"}
              label={"Email Address"}
              formFields={formFields}
              setFormFields={setFormFields}
              handleTextChange={handleTextChange}
            />
            <View style={tw.style(`h-[${height / 30}px]`)} />
            <InputField
              type={"password"}
              value={formFields.password}
              fieldName={"password"}
              label={"Password"}
              formFields={formFields}
              handleTextChange={handleTextChange}
            />
          </View>
          <View
            style={tw.style(
              `flex-row mt-[${
                height / 60
              }] justify-between items-center pl-[18px] pr-[24px]`
            )}
          >
            <View style={tw.style("flex-row items-center gap-[8px]")}>
              <BouncyCheckbox
                size={30}
                fillColor="red"
                unfillColor="#FFFFFF"
                iconStyle={{ borderColor: "red", borderRadius: 10 }}
                innerIconStyle={{
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: formFields.rememberMe ? "red" : "gray",
                }}
                textContainerStyle={{ display: "none" }}
                onPress={(isChecked) => {
                  setFormFields((prev) => ({ ...prev, rememberMe: isChecked }));
                }}
              />
              <Text style={tw.style("", { fontFamily: "Quicksand-Medium" })}>
                Remember me
              </Text>
            </View>
            <TouchableOpacity>
              <Text style={tw.style("", { fontFamily: "Quicksand-Medium" })}>
                Forgot password?
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => dispatch(loginUser())}
            style={tw.style(
              "bg-purple-500 mx-[20px] mt-[40px] rounded-[8px] justify-center items-center h-[42px]"
            )}
          >
            <Text
              style={tw.style("text-white text-[14px]", {
                fontFamily: "Quicksand-Medium",
              })}
            >
              Log in
            </Text>
          </TouchableOpacity>
          <View
            style={tw.style(
              `flex-row mt-[${
                height / 60
              }] justify-center gap-[6px] items-center pl-[18px] pr-[24px]`
            )}
          >
            <Text style={tw.style("", { fontFamily: "Quicksand-Medium" })}>
              Don't have an account?
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Signup");
              }}
            >
              <Text style={tw.style("", { fontFamily: "Quicksand-Bold" })}>
                SIGN UP
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default Login;
