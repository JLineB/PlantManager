import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { EnvironmentButton } from '../components/EnvironmentButton';
import { Header } from '../components/Header';
import api from '../services/api';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface EnvironmentProps {
    key: string;
    title: string;
}

interface PlantProps {
        id: string;
        name: string;
        about: string;
        water_tips: string;
        photo: string;
        environments: [string];
        frequency: {
          times: number;
          repeat_every: string;
        }
}

export function PlantSelect() {
    const [environments, setEnvironments] = useState<EnvironmentProps[]>([]);
    const [plants, setPlants] = useState<PlantProps[]>([]);

    useEffect(() => {
        async function fetchEnvironment(){
            const { data } = await api.get('plants_environments');
            setEnvironments([
                {
                    key: 'all',
                    title: 'Todos',
                },
                ... data
            ]);
        }
        fetchEnvironment();
    }, [])

    useEffect(() => {
        async function fetchEnvironment(){
            const { data } = await api.get('plants_environments');
            setEnvironments([
                {
                    key: 'all',
                    title: 'Todos',
                },
                ... data
            ]);
        }
        fetchEnvironment();
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.heading}>
                <Header />

            <Text style={styles.title}>
                Em qual ambiente
            </Text>
            <Text style={styles.subtitle}>
                você quer colocar sua planta?
            </Text>
            </View>

        <View>
            <FlatList
                data={environments}
                renderItem={({ item }) => (
                    <EnvironmentButton
                        title={item.title}
                    />
                    )}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.environmentList}
            />
        </View>

        <View style={styles.plants}>
            {/* <FlatList
                data={}
            /> */}
        </View>

           

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    },

    heading: {
        paddingHorizontal: 30
    },

    title: {
        fontSize: 17,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 20,
        marginTop: 15
    },

    subtitle: {
        fontFamily: fonts.text,
        fontSize: 17,
        lineHeight: 20,
        color: colors.heading
    },

    environmentList: {
        height: 40,
        justifyContent: 'center',
        paddingBottom: 5,
        marginLeft: 32,
        marginVertical: 32
    },

    plants: {
        flex: 1,
        paddingHorizontal: 32,
        justifyContent: 'center',
    }
});