import React, { useEffect, useState } from "react";
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

const spacing = 5;
const width = (Dimensions.get("window").width - 4 * 10) / 2;

function EmptyHomeView() {
  const style = {
    color: "#707070",
    fontSize: 16,
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
      <Image source={require("../assets/homeImage.png")} />
      <Text style={style}>
        ChildIDFile helps you create and store an easily shared file for each of
        your children. This file will include information law enforcement may
        find useful in the immediate search for a missing child, to include up
        to 3 emergency contacts, 10 trusted contacts/locations, and other useful
        identifyingfeatures.
      </Text>
      <Text style={{ ...style, fontFamily: "SegoeUI-Italic" }}>
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

  const onDelete = (id) => {
    setSelected(id);
    setDeleteModelOpen(true);
  };

  const DeleteModal = () => {
    return (
      <CustomModal transparent visible={deleteModelOpen}>
        <Text style={globleStyles.modalText}>
          Are you sure, you want to delete this profile?
        </Text>
        <View style={globleStyles.modalIcon}>
          <AntDesign name="exclamationcircleo" size={54} color="red" />
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
    generatePdf(child);
  };

  const onShare = (id) => {
    const child = childrenList.find((childItem) => childItem.id === id);
    generatePdf(child, true);
  };

  const renderChildItem = ({ item }) => {
    return (
      <View
        key={item.id}
        style={[
          styles.item,
          {
            padding: 16,
            borderRadius: 20,
            width: width,
            marginVertical: spacing,
            marginHorizontal: spacing,
          },
        ]}
      >
        {item.incomplete && (
          <View style={styles.incompleteContainer}>
            <Text style={[styles.incompleteText, { fontSize: 6 }]}>
              Incomplete
            </Text>
          </View>
        )}
        <Image
          style={styles.itemImage}
          source={
            item.image1
              ? { uri: `data:image/jpg;base64,${item.image1}` }
              : require("../assets/userImage.png")
          }
        />
        <View style={[styles.itemNameContainer, { marginTop: 14 }]}>
          <Text style={[styles.itemName, { marginRight: 5, fontSize: 16 }]}>
            {`${item.firstName} ${item.lastName}`}
          </Text>
          <TouchableOpacity
            style={{ width: 12, height: 12 }}
            onPress={() => onEdit(item.id)}
          >
            <MaterialIcons
              name="edit"
              size={12}
              color="#434343"
              style={{ position: "absolute", right: -12 }}
            />
          </TouchableOpacity>
        </View>
        <Text style={[styles.itemNickName, { fontSize: 14, marginTop: 4 }]}>
          {item.nickName}
        </Text>
        {!item.incomplete && item.specialNeeds && (
          <Text
            style={[styles.itemDescription, { fontSize: 12, marginTop: 4 }]}
          >
            {item.specialNeeds}
          </Text>
        )}

        <CustomButton
          onPress={() => onEdit(item.id, !item.incomplete)}
          text={item.incomplete ? "Complete" : "View"}
          buttonStyle={[
            globleStyles.buttonPrimary,
            {
              backgroundColor: COLOR.primary,
              width: 80,
              height: 28,
              marginTop: 22,
            },
          ]}
          backgroundColor={COLOR.primary}
          textStyle={{ fontSize: 10, color: "#FFF" }}
        />
        <View style={[styles.itemFooter, { justifyContent: "space-around" }]}>
          <TouchableOpacity
            style={[styles.iconContainer, { width: 24, height: 24 }]}
            onPress={() => onShare(item.id)}
          >
            <Feather name="external-link" size={12} color="#B6B6B6" />
          </TouchableOpacity>
          {!item.incomplete && (
            <TouchableOpacity
              style={[styles.iconContainer, { width: 24, height: 24 }]}
              onPress={() => onDownlod(item.id)}
            >
              <Feather name="download" size={12} color="#B6B6B6" />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={[styles.iconContainer, { width: 24, height: 24 }]}
            onPress={() => onDelete(item.id)}
          >
            <AntDesign name="delete" size={12} color="#B6B6B6" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderSingleColumnItems = () => {
    return childrenList.map((item) => {
      return (
        <View key={item.id} style={styles.item}>
          {item.incomplete && (
            <View style={styles.incompleteContainer}>
              <Text style={styles.incompleteText}>Incomplete</Text>
            </View>
          )}
          <Image
            style={styles.itemImage}
            source={
              item.image1
                ? { uri: `data:image/jpg;base64,${item.image1}` }
                : require("../assets/userImage.png")
            }
          />
          <View style={styles.itemNameContainer}>
            <Text
              style={styles.itemName}
            >{`${item.firstName} ${item.lastName}`}</Text>
            <TouchableOpacity
              style={{ width: 14, height: 14 }}
              onPress={() => onEdit(item.id)}
            >
              <MaterialIcons
                name="edit"
                size={14}
                color="#434343"
                style={{ position: "absolute", right: -12 }}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.itemNickName}>{item.nickName}</Text>
          {item.specialNeeds && (
            <Text style={styles.itemDescription}>{item.specialNeeds}</Text>
          )}
          <View style={styles.itemFooter}>
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => onShare(item.id)}
            >
              <Feather name="external-link" size={14} color="#B6B6B6" />
            </TouchableOpacity>
            {!item.incomplete && (
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={() => onDownlod(item.id)}
              >
                <Feather name="download" size={14} color="#B6B6B6" />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => onDelete(item.id)}
            >
              <AntDesign name="delete" size={14} color="#B6B6B6" />
            </TouchableOpacity>
            <CustomButton
              onPress={() => onEdit(item.id, !item.incomplete)}
              text={item.incomplete ? "Complete" : "View"}
              buttonStyle={[
                globleStyles.buttonPrimary,
                {
                  backgroundColor: COLOR.primary,
                  width: 96,
                  height: 36,
                  marginRight: 0,
                },
              ]}
              color="#FFFFFF"
            />
          </View>
        </View>
      );
    });
  };

  useEffect(() => {}, []);

  return (
    <SafeAreaView style={globleStyles.container}>
      <View style={styles.mainTextContainer}>
        <Text style={styles.mainText}>Welcome</Text>
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
                  optionsContainer: { width: 180 },
                  optionWrapper: { padding: 10 },
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
            {renderSingleColumnItems()}
          </ScrollView>
        ) : (
          <View style={styles.childrenListContainer}>
            <FlatList
              style={styles.list}
              data={childrenList}
              renderItem={renderChildItem}
              contentContainerStyle={{ justifyContent: "space-around" }}
              numColumns={2}
              columnWrapperStyle={{ flexShrink: 1 }}
            />
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
    marginBottom: 12,
  },
  mainText: {
    color: "#000",
    fontSize: 36,
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
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 36,
    padding: 28,
    marginVertical: 12,
    marginHorizontal: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 11,
    },
    shadowOpacity: 0.55,
    shadowRadius: 18,
    elevation: 3,
  },
  itemImage: {
    width: 46,
    height: 46,
    borderRadius: 46 / 2,
    backgroundColor: "#F5F5F5",
    resizeMode: "center",
  },
  itemNameContainer: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  itemName: {
    color: "#434343",
    fontSize: 22,
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
  itemFooter: {
    width: "90%",
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingRight: 0,
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
});

export default Home;
