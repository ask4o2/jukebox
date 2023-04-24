import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native";
import { View, StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import { Path, Svg } from "react-native-svg";
import { useDispatch } from "react-redux";
import { StatusBar } from "expo-status-bar";
import tw from "twrnc";
import { Image } from "react-native";
import { ScrollView } from "react-native";
import InputField from "../components/InputField";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { TouchableOpacity } from "react-native";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { auth } from "../firebase";
import { ImageBackground } from "react-native";
import { useEffect } from "react";
import { loginUser } from "../features/user/userSlice";

const Signup = ({ navigation }) => {
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
    confirmPassword: "",
    rememberMe: false,
  });

  const handleTextChange = (newValue, fieldName) => {
    setFormFields((prevState) => ({
      ...prevState,
      [`${fieldName}`]: newValue,
    }));
  };

  const createUser = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formFields.email,
        formFields.password
      );

      console.log(userCredential);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(loginUser(user));
      }

      return unsubscribe;
    });
  }, []);

  return (
    <SafeAreaView style={tw.style("flex-1")}>
      <StatusBar style="dark" translucent={true} animated={true} />
      <ScrollView style={tw.style(`bg-white`)}>
        <View>
          <View
            style={tw.style(`w-[${width}px] h-[${height / 2.3}px] bg-gray-400`)}
          >
            <Image
              source={require("../assets/signup-banner.jpg")}
              style={tw.style("w-full h-[100%] bg-red-300")}
            />
            <View
              style={tw.style("absolute -bottom-0 z-10", {
                transform: [{ rotateY: "180deg" }],
              })}
            >
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
            <InputField
              type={"password"}
              value={formFields.password}
              fieldName={"password"}
              label={"Password"}
              formFields={formFields}
              handleTextChange={handleTextChange}
            />
            <InputField
              type={"password"}
              value={formFields.confirmPassword}
              fieldName={"confirmPassword"}
              label={"Confirm Password"}
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
                fillColor="tomato"
                unfillColor="#FFFFFF"
                iconStyle={{ borderColor: "red", borderRadius: 10 }}
                innerIconStyle={{
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: formFields.rememberMe ? "tomato" : "gray",
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
          </View>
          <TouchableOpacity
            onPress={() => createUser()}
            style={tw.style(
              "bg-amber-500 mx-[20px] mt-[40px] rounded-[8px] justify-center items-center h-[42px]"
            )}
          >
            <Text
              style={tw.style("text-white text-[14px]", {
                fontFamily: "Quicksand-Medium",
              })}
            >
              Sign up
            </Text>
          </TouchableOpacity>
          <View
            style={tw.style(
              `flex-row mt-[${
                height / 60
              }] mb-10 justify-center gap-[6px] items-center pl-[18px] pr-[24px]`
            )}
          >
            <Text style={tw.style("", { fontFamily: "Quicksand-Medium" })}>
              Already have an account?
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
              <Text style={tw.style("", { fontFamily: "Quicksand-Bold" })}>
                SIGN IN
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default Signup;
