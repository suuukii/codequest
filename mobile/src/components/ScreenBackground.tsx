import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { ReactNode, useCallback } from 'react'
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native'

SplashScreen.preventAutoHideAsync()

type ScreenBackgroundProps = {
    title: string
    subtitle: string
    children: ReactNode
}

export function ScreenBackground({ title, subtitle, children }: ScreenBackgroundProps) {
    const [fontsLoaded] = useFonts({
        'ZalandoSansExpanded': require('@/assets/fonts/ZalandoSansExpanded-Black.ttf'),
        'Geist-Regular': require('@/assets/fonts/Geist-Regular.ttf'),
        'Geist-Bold': require('@/assets/fonts/Geist-Bold.ttf'),
    })

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync()
        }
    }, [fontsLoaded])

    if (!fontsLoaded) {
        return null
    }

    return (
        <View style={styles.backgroundContainer} onLayout={onLayoutRootView}>
            <Image
                source={require('@/assets/ellipse-verde.png')}
                style={[styles.bgSpot, styles.spotTopRight]}
            />
            <Image
                source={require('@/assets/ellipse-azul.png')}
                style={[styles.bgSpot, styles.spotBottomLeft]}
            />

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.select({ ios: 'padding', android: 'height' })}
            >
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.container}>
                        <Image source={require('@/assets/logo1.png')} style={styles.illustration} />
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.subtitle}>{subtitle}</Text>

                        {children}
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    )
}

const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        backgroundColor: '#060111',
        position: 'relative',
    },

    bgSpot: {
        position: 'absolute',
        opacity: 1.0,
        resizeMode: 'contain',
    },

    spotTopRight: {
        width: 600,
        height: 600,
        top: -30,
        right: 0,
    },

    spotBottomLeft: {
        width: 600,
        height: 600,
        top: 250,
        left: -10,
    },

    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: 'transparent',
    },

    illustration: {
        width: '80%',
        height: 250,
        resizeMode: 'contain',
    },

    title: {
        fontSize: 28,
        marginTop: -70,
        marginBottom: 8,
        fontFamily: 'ZalandoSansExpanded',
        color: '#fff',
    },
    
    subtitle: {
        fontSize: 14,
        color: '#fff',
        fontFamily: 'Geist-Regular',
        textAlign: 'center',
        paddingHorizontal: 20,
        paddingBottom: 24,
        marginBottom: 20,
    },
})