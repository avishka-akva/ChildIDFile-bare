import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Linking,
  TouchableWithoutFeedback,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";
import {
  Feather,
  AntDesign,
  MaterialIcons,
  Entypo,
  FontAwesome,
} from "@expo/vector-icons";
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

function AddFabButton({ onPress }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={[styles.backgroundCircle, { backgroundColor: COLOR.primary }]}
      >
        <Feather name={"plus"} color={COLOR.white} size={40} />
      </View>
    </TouchableWithoutFeedback>
  );
}

function EmptyHomeView({ onAddClick }) {
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
        flex: 1,
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
      <AddFabButton onPress={onAddClick} />
    </View>
  );
}

function Home({ navigation }) {
  const childrenList = useSelector((state) => state.childrenList);
  const dispatch = useDispatch();

  const [deleteModelOpen, setDeleteModelOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
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
        onClose={() => {
          setDeleteModelOpen(false);
        }}
        paddingHorizontal={38}
      >
        <View style={[globleStyles.rowCenter, { marginBottom: 28 }]}>
          <AntDesign
            name="exclamationcircleo"
            size={26}
            color={COLOR.primary}
          />
          <Text style={[globleStyles.modalText, { marginLeft: 14 }]}>
            Are you sure, you want to delete this profile?
          </Text>
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

  const onDownlod = async (id) => {
    if (isLoading) return;
    setIsLoading(true);
    const child = childrenList.find((childItem) => childItem.id === id);
    await generatePdf("main", child);
    setIsLoading(false);
  };

  const onShare = async (id) => {
    if (isLoading) return;
    setIsLoading(true);
    const child = childrenList.find((childItem) => childItem.id === id);
    await generatePdf("main", child, true);
    setIsLoading(false);
  };

  const RenderChildItem = ({ item }) => {
    return (
      <Pressable
        onPress={() => {
          onDownlod(item.id);
        }}
        disabled={isLoading || item.incomplete}
      >
        <View key={item.id} style={styles.item}>
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {item.incomplete && (
                <View style={globleStyles.badgeContainer}>
                  <Text style={globleStyles.badgeText}>Incomplete</Text>
                </View>
              )}
            </View>
            <TouchableOpacity
              style={{ padding: 5 }}
              onPress={() => onDelete(item.id)}
            >
              <AntDesign name="close" size={16} color="#B6B6B6" />
            </TouchableOpacity>
          </View>
          <View style={styles.itemHeader}>
            <Text style={styles.itemName}>
              {`${item.firstName} ${item.lastName}`}
            </Text>
            {item.image1 ? (
              <Image
                style={styles.itemImage}
                source={{ uri: `data:image/jpg;base64,${item.image1}` }}
              />
            ) : (
              <View style={styles.defaulImageContainer}>
                <Image
                  style={styles.defaulImage}
                  source={require("../assets/userImage.png")}
                />
              </View>
            )}

            <Text style={styles.description}>{`${
              item.gender === "male"
                ? "Son"
                : item.gender === "female"
                ? "Daughter"
                : "X"
            }`}</Text>
            <Text style={styles.description}>{item.dob}</Text>
          </View>
          <View style={styles.itemAction}>
            <CustomButton
              // onPress={() => onEdit(item.id)}
              onPress={() => onEdit(item.id)}
              text={item.incomplete ? "Complete" : "Edit"}
              buttonStyle={[globleStyles.buttonPrimary, styles.buttonStyle]}
              textStyle={styles.buttonTextStyle}
              leftIcon={
                item.incomplete ? (
                  <Feather
                    style={{ marginRight: 4 }}
                    name="edit"
                    size={14}
                    color={COLOR.white}
                  />
                ) : (
                  <MaterialIcons
                    style={{ marginRight: 4 }}
                    name="edit"
                    size={14}
                    color={COLOR.white}
                  />
                )
              }
            />
            <CustomButton
              onPress={() => onShare(item.id)}
              text="Share"
              buttonStyle={[
                globleStyles.buttonPrimary,
                styles.buttonStyle,
                item.incomplete ? { backgroundColor: "#DAD7D7" } : {},
              ]}
              textStyle={
                item.incomplete
                  ? [styles.buttonTextStyle, { color: COLOR.disabled }]
                  : styles.buttonTextStyleƒ
              }
              leftIcon={
                <FontAwesome
                  style={{ marginRight: 4 }}
                  name="share"
                  size={14}
                  color={item.incomplete ? COLOR.disabled : COLOR.white}
                />
              }
              disabled={isLoading || item.incomplete}
            />
          </View>
          <Text style={styles.lastUpdate}>
            Last Update on {item.lastEditDate} at {item.lastEditTime}
          </Text>
        </View>
      </Pressable>
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

  const onAddClick = () => navigation.navigate("ChildProfile");

  return (
    <SafeAreaView style={globleStyles.container}>
      <View style={styles.mainTextContainer}>
        <Text style={styles.mainText}>
          {childrenList.length > 0 ? "Child Profiles" : "Welcome"}
        </Text>
        <View style={styles.mainRight}>
          {childrenList.length > 0 && (
            <Text style={styles.childrenCount}>{childrenList.length}/10</Text>
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
      {childrenList.length > 0 && (
        <View
          style={{
            height: 12,
            width: "100%",
            overflow: "hidden",
            backgroundColor: "transparent",
          }}
        >
          <View style={styles.bottomBoxShadow}></View>
        </View>
      )}

      {childrenList.length ? (
        childrenList.length <= 2 ? (
          <>
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
            <AddFabButton onPress={onAddClick} />
          </>
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
              onEndReached={() => setFlatListScroll("up")}
              onScroll={(event) =>
                event.nativeEvent.contentOffset.y <= 0 &&
                setFlatListScroll("down")
              }
            />
            <TouchableWithoutFeedback onPress={onPressFlatListDown}>
              <View style={[styles.backgroundCircle, { bottom: 90 }]}>
                <Feather
                  name={`chevron-${flatListScroll}`}
                  style={{ marginTop: flatListScroll === "down" ? 5 : 0 }}
                  color={COLOR.primary}
                  size={40}
                />
              </View>
            </TouchableWithoutFeedback>
            {childrenList.length <= 10 && <AddFabButton onPress={onAddClick} />}
          </View>
        )
      ) : (
        <EmptyHomeView onAddClick={onAddClick} />
      )}
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
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: "#F7F7F7",
  },
  bottomBoxShadow: {
    width: "100%",
    height: 1,
    backgroundColor: "#D3D3D3",
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
    marginBottom: 12,
  },
  mainText: {
    color: "#434343",
    fontSize: 24,
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
    marginTop: 6,
  },
  buttonContainer: {
    padding: 24,
    paddingVertical: 18,
  },
  childrenCount: {
    color: "#9B9B9B",
    fontSize: 22,
    marginRight: 12,
  },
  childrenListContainer: {
    flex: 1,
    width: "100%",
  },
  list: {
    paddingHorizontal: 8,
    backgroundColor: "#F7F7F7",
  },
  item: {
    width: 276,
    // height: 287,
    backgroundColor: COLOR.white,
    borderRadius: 36,
    marginVertical: 12,
    marginHorizontal: 3,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2,
    padding: 18,
  },
  itemHeader: {
    alignItems: "center",
    justifyContent: "center",
  },
  itemImage: {
    width: 78,
    height: 78,
    borderRadius: 78 / 2,
    borderColor: COLOR.primary,
    borderWidth: 3,
    backgroundColor: "#F5F5F5",
    resizeMode: "contain",
    marginBottom: 6,
  },
  defaulImageContainer: {
    width: 78,
    height: 78,
    borderRadius: 78 / 2,
    backgroundColor: "#dddddd",
    marginBottom: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  defaulImage: {
    width: 48,
    height: 48,
    resizeMode: "contain",
  },
  itemName: {
    color: "#000000",
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
    alignItems: "center",
    justifyContent: "space-around",
    marginVertical: 12,
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
    height: 60,
    width: 60,
    borderRadius: 30,
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  buttonStyle: {
    flexDirection: "row",
    backgroundColor: COLOR.primary,
    width: 100,
    height: 38,
  },
  buttonTextStyle: {
    fontSize: 14,
    color: COLOR.white,
    fontWeight: "600",
  },
  lastUpdate: {
    fontSize: 11,
    textAlign: "center",
    fontFamily: "SegoeUI-Italic",
  },
});

export default Home;
