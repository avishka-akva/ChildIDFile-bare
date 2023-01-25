import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Linking,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";
import { Feather, AntDesign, MaterialIcons, Entypo } from "@expo/vector-icons";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";

import CustomButton from "../components/CustomButton";
import { globleStyles } from "../shared/style";
import { deleteChild } from "../redux/childrenListSlice";
import CustomModal from "../components/CustomModal";
import generatePdf from "../shared/pdf";
import {
  COLOR,
  PRIVACY_POLICY_URL,
  TERMS_AND_CONDITION_URL,
} from "../shared/const";
import BulletList from "../components/BulletList";

const spacing = 5;
const width = (Dimensions.get("window").width - 4 * 10) / 2;

function EmptyHomeView() {
  const style = {
    color: "#707070",
    fontSize: 14,
    marginTop: 28,
    textAlign: "center",
    fontFamily: "Segoe-UI",
  };

  return (
    <View
      style={{
        paddingHorizontal: 24,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        style={{ width: 200, height: 200 }}
        source={require("../assets/homeImage.png")}
      />
      <BulletList
        containerStyle={{ marginTop: 20 }}
        childStyle={{
          width: "95%",
          color: "#707070",
          fontSize: 14,
          fontFamily: "Segoe-UI",
        }}
        pointSize={14}
        pointColor="#707070"
        options={[
          "ChildIDFile helps you create an information file for each of your children, which can be easily shared.",
          "This file includes information that law enforcement may find useful in the immediate search for a missing child.",
          "The file can include up to 3 emergency contacts, 10 trusted contacts/locations, and other useful identifying features.",
        ]}
      />
      <Text style={style}>
        It is up to you how much to save and have ready. The data you enter and
        file you create lives on your phone or device only.
      </Text>
    </View>
  );
}

function Home({ navigation }) {
  const childrenList = useSelector((state) => state.childrenList);
  const dispatch = useDispatch();

  const [deleteModelOpen, setDeleteModelOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const [flatListScroll, setFlatListScroll] = useState("down");

  const flatListRef = useRef();

  const onDelete = (id) => {
    setSelected(id);
    setDeleteModelOpen(true);
  };

  const DeleteModal = () => {
    return (
      <CustomModal
        transparent
        visible={deleteModelOpen}
        setVisible={() => {
          setDeleteModelOpen(false);
        }}
      >
        <Text style={globleStyles.modalText}>
          Are you sure, you want to delete this profile?
        </Text>
        <View style={globleStyles.modalIcon}>
          <AntDesign
            name="exclamationcircleo"
            size={54}
            color={COLOR.primary}
          />
        </View>
        <View style={globleStyles.modalFooter}>
          <CustomButton
            onPress={() => {
              setDeleteModelOpen(false);
            }}
            text={"No"}
            buttonStyle={[
              globleStyles.buttonOutLine,
              { borderColor: COLOR.primary, width: 116, height: 36 },
            ]}
            color={COLOR.primary}
          />
          <CustomButton
            onPress={() => {
              dispatch(deleteChild(selected));
              setDeleteModelOpen(false);
            }}
            text={"Yes"}
            buttonStyle={[
              globleStyles.buttonPrimary,
              { backgroundColor: COLOR.primary, width: 116, height: 36 },
            ]}
            backgroundColor={COLOR.primary}
            color="#FFFFFF"
          />
        </View>
      </CustomModal>
    );
  };

  const onEdit = (id, view = false) => {
    navigation.navigate("ChildProfile", { childId: id, view });
  };

  const onDownlod = (id) => {
    const child = childrenList.find((childItem) => childItem.id === id);
    generatePdf("main", child);
  };

  const onShare = (id) => {
    const child = childrenList.find((childItem) => childItem.id === id);
    generatePdf("main", child, true);
  };

  const RenderChildItem = ({ item }) => {
    return (
      <View key={item.id} style={styles.item}>
        {/* {item.incomplete && (
          <View style={styles.incompleteContainer}>
            <Text style={[styles.incompleteText, { fontSize: 6 }]}>
              Incomplete
            </Text>
          </View>
        )} */}

        <View style={styles.itemHeader}>
          <Image
            style={styles.itemImage}
            source={
              item.image1
                ? { uri: `data:image/jpg;base64,${item.image1}` }
                : require("../assets/userImage.png")
            }
          />
          <Text style={styles.itemName}>
            {`${item.firstName} ${item.lastName}`}
          </Text>
        </View>
        <View style={styles.itemFooter}>
          <View style={styles.itemAction}>
            <TouchableOpacity
              style={[styles.iconContainer, { marginRight: 28 }]}
              onPress={() => onEdit(item.id)}
            >
              <MaterialIcons name="edit" size={16} color="#B6B6B6" />
            </TouchableOpacity>

            {!item.incomplete && (
              <TouchableOpacity
                style={[styles.iconContainer, { marginRight: 28 }]}
                onPress={() => onShare(item.id)}
              >
                <Feather name="external-link" size={16} color="#B6B6B6" />
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => onDelete(item.id)}
            >
              <AntDesign name="delete" size={16} color="#B6B6B6" />
            </TouchableOpacity>
          </View>
          <CustomButton
            onPress={() => onEdit(item.id, !item.incomplete)}
            text={item.incomplete ? "Complete" : "View"}
            buttonStyle={[
              globleStyles.buttonPrimary,
              {
                backgroundColor: COLOR.primary,
                width: 100,
                height: 38,
                marginTop: 22,
              },
            ]}
            backgroundColor={COLOR.primary}
            textStyle={{ fontSize: 14, color: COLOR.white, fontWeight: "600" }}
          />
        </View>
      </View>
    );
  };

  const RenderSingleColumnItems = () =>
    childrenList.map((item, index) => (
      <RenderChildItem key={index} item={item} />
    ));

  const onPressFlatListDown = () => {
    if (flatListScroll === "down") {
      flatListRef.current?.scrollToEnd();
      setFlatListScroll("up");
      return;
    }

    flatListRef.current?.scrollToIndex({ index: 0 });
    setFlatListScroll("down");
  };

  useEffect(() => {}, []);

  return (
    <SafeAreaView style={globleStyles.container}>
      <View style={styles.mainTextContainer}>
        <Text style={styles.mainText}>
          {childrenList.length > 0 ? "Saved Child Profiles" : "Welcome"}
        </Text>
        <View style={styles.mainRight}>
          {childrenList.length > 0 && (
            <Text style={styles.childrenCount}>{childrenList.length}</Text>
          )}
          <View>
            <Menu>
              <MenuTrigger>
                <Entypo name="dots-three-vertical" size={14} color="#434343" />
              </MenuTrigger>
              <MenuOptions
                customStyles={{
                  optionsContainer: { width: 185, padding: 5 },
                  optionWrapper: { width: 170, padding: 10 },
                }}
              >
                <MenuOption
                  onSelect={async () => {
                    await Linking.openURL(PRIVACY_POLICY_URL);
                  }}
                >
                  <View style={styles.menuOption}>
                    <Entypo
                      style={styles.menuOptionIcon}
                      name="lock"
                      size={14}
                      color="#797979"
                    />
                    <Text>Privacy Policy</Text>
                  </View>
                </MenuOption>
                <MenuOption
                  onSelect={async () => {
                    await Linking.openURL(TERMS_AND_CONDITION_URL);
                  }}
                >
                  <View style={styles.menuOption}>
                    <MaterialIcons
                      style={styles.menuOptionIcon}
                      name="info"
                      size={14}
                      color="#797979"
                    />
                    <Text>Terms and Conditions</Text>
                  </View>
                </MenuOption>
              </MenuOptions>
            </Menu>
          </View>
        </View>
      </View>
      {childrenList.length ? (
        childrenList.length <= 2 ? (
          <ScrollView
            style={{
              paddingHorizontal: 24,
            }}
            contentContainerStyle={{
              flexGrow: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <RenderSingleColumnItems />
          </ScrollView>
        ) : (
          <View style={styles.childrenListContainer}>
            <FlatList
              ref={flatListRef}
              style={styles.list}
              data={childrenList}
              renderItem={RenderChildItem}
              contentContainerStyle={{
                justifyContent: "center",
                alignItems: "center",
              }}
            />
            <TouchableWithoutFeedback onPress={onPressFlatListDown}>
              <View style={styles.backgroundCircle}>
                <Feather
                  name={`chevron-${flatListScroll}`}
                  style={{ marginTop: flatListScroll === "down" ? 5 : 0 }}
                  color={COLOR.primary}
                  size={40}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        )
      ) : (
        <EmptyHomeView />
      )}
      <View style={styles.buttonContainer}>
        <CustomButton
          onPress={() => navigation.navigate("ChildProfile")}
          text={"Add Profile"}
          backgroundColor={COLOR.primary}
          color="#FFFFFF"
        />
      </View>
      <DeleteModal />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainTextContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    marginTop: 12,
    marginBottom: 24,
  },
  mainText: {
    color: "#434343",
    fontSize: 28,
    fontFamily: "SegoeUI-SemiBold",
  },
  mainRight: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  description: {
    color: "#707070",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
  buttonContainer: {
    padding: 24,
    paddingVertical: 18,
  },
  childrenCount: {
    color: "#9B9B9B",
    fontSize: 36,
    marginRight: 12,
  },
  childrenListContainer: {
    flex: 1,
    width: "100%",
  },
  list: {
    paddingHorizontal: 8,
  },
  item: {
    width: 276,
    // height: 287,
    backgroundColor: COLOR.white,
    borderRadius: 36,
    marginVertical: 12,
    // marginHorizontal: 6,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2,
  },
  itemHeader: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLOR.primary,
    borderRadius: 36,
    height: 144,
  },
  itemImage: {
    width: 78,
    height: 78,
    borderRadius: 78 / 2,
    borderColor: COLOR.white,
    borderWidth: 3,
    backgroundColor: "#F5F5F5",
    resizeMode: "center",
    marginBottom: 6,
  },
  itemName: {
    color: COLOR.white,
    fontSize: 24,
    fontWeight: "400",
    lineHeight: 28,
  },
  itemNickName: {
    color: "#797979",
    fontSize: 16,
    marginTop: 8,
  },
  itemDescription: {
    color: "#918F8F",
    fontSize: 14,
    marginTop: 8,
    textAlign: "center",
  },
  itemAction: {
    flexDirection: "row",
  },
  itemFooter: {
    alignItems: "center",
    justifyContent: "center",
    padding: 22,
  },
  iconContainer: {
    width: 28,
    height: 28,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#B6B6B6",
    alignItems: "center",
    justifyContent: "center",
  },
  incompleteContainer: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#EA304E",
    borderRadius: 19,
    marginBottom: 12,
  },
  incompleteText: {
    color: "#EA304E",
    fontSize: 8,
    marginVertical: 3,
    marginHorizontal: 8,
  },
  menuOption: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuOptionIcon: {
    marginRight: 6,
  },
  backgroundCircle: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLOR.white,
    borderWidth: 1,
    borderColor: COLOR.primary,
    height: 50,
    width: 50,
    borderRadius: 25,
    position: "absolute",
    bottom: 5,
    right: 20,
  },
});

export default Home;
