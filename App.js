import React from "react";
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from "react-native";
import axios from "axios";

const { height, width } = Dimensions.get("window");

export default class App extends React.Component {
    state = {
        name: "",
        cell: "",
        gender: "",
        picture: "http://via.placeholder.com/350x150",
        type: "name"
    };
    componentDidMount() {
        this.fetchUserProfile();
    }
    fetchUserProfile = () => {
        axios({
            method: "GET",
            url: "https://randomuser.me/api/"
        })
            .then(response => {
                const profile = response.data.results[0];
                this.setState({
                    name: `${profile.name.title} ${profile.name.first} ${profile.name.last}`,
                    cell: profile.cell,
                    gender: profile.gender,
                    picture: profile.picture.large
                });
            })
            .catch(err => {
                console.log("Error fetching user profile: ", err);
            });
    };
    changeUserDetail = type => {
        this.setState({
            type: type
        });
    };
    render() {
        const { name, cell, gender, picture, type } = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.card}>
                    <View style={styles.emptyContainer} />
                    <View style={styles.profileContainer}>
                        <Image
                            source={{ uri: picture }}
                            resizeMode="contain"
                            resizeMethod="auto"
                            style={{
                                width: 100,
                                height: 100,
                                borderRadius: 100
                            }}
                        />
                    </View>
                    <View style={styles.profileDetails}>
                        <Text style={styles.label}>{`My ${type} is`}</Text>
                        <Text style={styles.name}>{type === "name" ? name : gender}</Text>
                    </View>
                    <View style={styles.btnGroup}>
                        <TouchableOpacity
                            onPress={() => this.changeUserDetail("name")}
                            style={styles.btn}
                        >
                            <Text style={styles.btnText}>Name</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.changeUserDetail("gender")}
                            style={styles.btn}
                        >
                            <Text style={styles.btnText}>Gender</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => this.fetchUserProfile()} style={styles.btn}>
                        <Text style={styles.btnText}>New Profile</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    },
    card: {
        width: width - 40,
        paddingHorizontal: 20,
        paddingBottom: 20,
        borderColor: "lightgray",
        borderWidth: 1,
        elevation: 2,
        justifyContent: "flex-start",
        alignItems: "center"
    },
    emptyContainer: {
        backgroundColor: "#efefef",
        width: width - 40,
        height: 100,
        borderBottomWidth: 1,
        borderBottomColor: "dimgray"
    },
    profileContainer: {
        position: "absolute",
        bottom: 180,
        borderRadius: 100,
        borderColor: "dimgray",
        borderWidth: 2,
        padding: 2
    },
    profileDetails: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 60
    },
    label: {
        fontSize: 14,
        color: "dimgray"
    },
    name: {
        fontSize: 24,
        color: "black"
    },
    btn: {
        backgroundColor: "blue",
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 3
    },
    btnText: {
        color: "white",
        fontSize: 18
    },
    btnGroup: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 5
    }
});
