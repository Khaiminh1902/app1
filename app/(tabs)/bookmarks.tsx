import Loader from '@/components/Loader';
import { COLORS } from '@/constants/theme';
import { api } from '@/convex/_generated/api';
import { styles } from '@/styles/feed.styles';
import { useQuery } from 'convex/react';
import { Image } from 'expo-image';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';

export default function Bookmarks() {
  const bookmarkedPosts = useQuery(api.bookmarks.getBookmarkedPosts);
  if (bookmarkedPosts === undefined) return <Loader />
  if (bookmarkedPosts.length === 0) return <NoBookmarksFound />

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Bookmarks</Text>
      </View>
      <ScrollView
        contentContainerStyle={{
          padding: 8,
          flexDirection: "row",
          flexWrap:"wrap"
        }}
      >
        {bookmarkedPosts.map((post) => {
          if(!post) return null
          return (
            <View key={post._id}  style={{ borderColor: "#808080", borderWidth: 2, padding: 8,marginBottom:15 }}>
              <View style={{ width: "100%", padding: 1 }}>
                <Image
                  source={post.imageUrl}
                  style={{width: "100%", aspectRatio: 1}}
                  contentFit='cover'
                  transition={200}
                  cachePolicy="memory-disk"
                />
                <Text style={{ color: "white", paddingTop: 10, fontSize: 17}}>{post.caption}</Text>
              </View>
            </View>
          )
        })}
      </ScrollView>
    </View>
  )
}


function NoBookmarksFound() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.background,
      }}
    >
      <Text style={{ color: COLORS.primary, fontSize: 22 }}>No bookmarked posts yet</Text>
    </View>
  )
}