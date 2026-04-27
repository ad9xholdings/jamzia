import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// ─── Types ───────────────────────────────────────────────

export interface Account {
  id: string;
  handle: string;
  displayName: string;
  bio: string;
  avatar: string;
  banner: string;
  joinedAt: string;
  isLocked: boolean;
  boostsEnabled: boolean;
  language: string;
}

export interface Status {
  id: string;
  accountId: string;
  content: string;
  createdAt: string;
  visibility: 'public' | 'unlisted' | 'followers' | 'direct';
  replyToId?: string;
  replyToAccountId?: string;
  boostOfId?: string;
  boostOfAccountId?: string;
  mediaUrls: string[];
  favouritesCount: number;
  boostsCount: number;
  repliesCount: number;
  isFavourited: boolean;
  isBoosted: boolean;
  isBookmarked: boolean;
  hashtags: string[];
}

export interface Notification {
  id: string;
  type: 'follow' | 'favourite' | 'boost' | 'mention' | 'follow_request';
  accountId: string;
  statusId?: string;
  createdAt: string;
  read: boolean;
}

// ─── Mock Data: Accounts ─────────────────────────────────

const MOCK_ACCOUNTS: Account[] = [
  {
    id: 'u1', handle: 'jamzia', displayName: 'JamZia Official',
    bio: 'The everything app. AI powered intelligence platform. Building the future of social.',
    avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=jamzia', banner: '',
    joinedAt: '2024-01-15', isLocked: false, boostsEnabled: true, language: 'en',
  },
  {
    id: 'u2', handle: 'elara', displayName: 'Elara Chen',
    bio: 'Designer & creative technologist. Building beautiful things.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=elara', banner: '',
    joinedAt: '2024-03-20', isLocked: false, boostsEnabled: true, language: 'en',
  },
  {
    id: 'u3', handle: 'marcus', displayName: 'Marcus Webb',
    bio: 'Software engineer. Open source contributor. Coffee enthusiast.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=marcus', banner: '',
    joinedAt: '2024-02-10', isLocked: false, boostsEnabled: true, language: 'en',
  },
  {
    id: 'u4', handle: 'nova', displayName: 'Nova AI Labs',
    bio: 'AI research lab pushing the boundaries of machine intelligence.',
    avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=nova', banner: '',
    joinedAt: '2024-04-01', isLocked: true, boostsEnabled: true, language: 'en',
  },
  {
    id: 'u5', handle: 'kai', displayName: 'Kai Nakamura',
    bio: 'Indie game dev | Pixel artist | Making JamPlay titles',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=kai', banner: '',
    joinedAt: '2024-05-15', isLocked: false, boostsEnabled: true, language: 'en',
  },
  {
    id: 'u6', handle: 'zara', displayName: 'Zara Okafor',
    bio: 'Music producer & audio engineer. JamAudio creator.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zara', banner: '',
    joinedAt: '2024-06-01', isLocked: false, boostsEnabled: true, language: 'en',
  },
  {
    id: 'u7', handle: 'leo', displayName: 'Leo Santos',
    bio: 'Film maker & storyteller. Documentary series on JamVideo.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=leo', banner: '',
    joinedAt: '2024-06-20', isLocked: false, boostsEnabled: true, language: 'en',
  },
  {
    id: 'u8', handle: 'aria', displayName: 'Aria Kim',
    bio: 'Tech educator & course creator on JamLearn. Teaching code to millions.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=aria', banner: '',
    joinedAt: '2024-07-10', isLocked: false, boostsEnabled: true, language: 'en',
  },
];

// ─── Mock Data: Statuses ─────────────────────────────────

const MOCK_STATUSES: Status[] = [
  {
    id: 's1', accountId: 'u2', content: 'Just shipped a new design system for our JamSocial interface. The gradient borders are looking amazing!',
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(), visibility: 'public',
    mediaUrls: [], favouritesCount: 42, boostsCount: 12, repliesCount: 5, isFavourited: false, isBoosted: false, isBookmarked: false,
    hashtags: ['design', 'jamzia'],
  },
  {
    id: 's2', accountId: 'u3', content: 'The new timeline fanout algorithm can now distribute posts to 32k followers in a single iteration. Massive performance win for large accounts.',
    createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(), visibility: 'public',
    mediaUrls: [], favouritesCount: 128, boostsCount: 34, repliesCount: 18, isFavourited: false, isBoosted: false, isBookmarked: false,
    hashtags: ['engineering', 'performance'],
  },
  {
    id: 's3', accountId: 'u4', content: 'Our latest AI model just achieved 99.2% accuracy on natural language understanding benchmarks. The future is here.',
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), visibility: 'public',
    mediaUrls: [], favouritesCount: 256, boostsCount: 89, repliesCount: 32, isFavourited: false, isBoosted: false, isBookmarked: false,
    hashtags: ['ai', 'ml', 'breakthrough'],
  },
  {
    id: 's4', accountId: 'u5', content: 'Working on a new AR battle royale game for JamPlay. Beta testing starts next month!',
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(), visibility: 'public',
    mediaUrls: [], favouritesCount: 67, boostsCount: 23, repliesCount: 41, isFavourited: false, isBoosted: false, isBookmarked: false,
    hashtags: ['gaming', 'ar', 'jamplay'],
  },
  {
    id: 's5', accountId: 'u6', content: 'New album dropping on JamAudio this Friday. 12 tracks, 2 years in the making.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(), visibility: 'public',
    mediaUrls: [], favouritesCount: 189, boostsCount: 56, repliesCount: 27, isFavourited: false, isBoosted: false, isBookmarked: false,
    hashtags: ['music', 'newrelease', 'jamaudio'],
  },
  {
    id: 's6', accountId: 'u7', content: 'The documentary series "Behind the Cloud" is now streaming on JamVideo. Episode 1 explores how we built the distributed storage system.',
    createdAt: new Date(Date.now() - 1000 * 60 * 90).toISOString(), visibility: 'public',
    mediaUrls: [], favouritesCount: 312, boostsCount: 78, repliesCount: 45, isFavourited: false, isBoosted: false, isBookmarked: false,
    hashtags: ['documentary', 'jamvideo', 'tech'],
  },
  {
    id: 's7', accountId: 'u8', content: 'Just published my new course "Advanced React Patterns" on JamLearn. 40 hours of content, completely free.',
    createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(), visibility: 'public',
    mediaUrls: [], favouritesCount: 445, boostsCount: 156, repliesCount: 89, isFavourited: false, isBoosted: false, isBookmarked: false,
    hashtags: ['react', 'javascript', 'jamlearn', 'education'],
  },
  {
    id: 's8', accountId: 'u1', content: 'Welcome to JamSocial! We are building the most advanced social platform on the planet. Follow us for updates.',
    createdAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(), visibility: 'public',
    mediaUrls: [], favouritesCount: 1024, boostsCount: 512, repliesCount: 128, isFavourited: false, isBoosted: false, isBookmarked: false,
    hashtags: ['jamzia', 'jamsocial', 'launch'],
  },
  {
    id: 's9', accountId: 'u3', content: 'Has anyone tried the new hashtag following feature? It is a game changer for content discovery.',
    createdAt: new Date(Date.now() - 1000 * 60 * 240).toISOString(), visibility: 'public',
    mediaUrls: [], favouritesCount: 34, boostsCount: 8, repliesCount: 15, isFavourited: false, isBoosted: false, isBookmarked: false,
    hashtags: ['feature', 'discovery'],
  },
  {
    id: 's10', accountId: 'u2', content: 'Design tip: Use gradient borders sparingly. They work best on dark backgrounds with subtle animation.',
    createdAt: new Date(Date.now() - 1000 * 60 * 300).toISOString(), visibility: 'public',
    mediaUrls: [], favouritesCount: 78, boostsCount: 21, repliesCount: 9, isFavourited: false, isBoosted: false, isBookmarked: false,
    hashtags: ['design', 'tips'],
  },
  {
    id: 's11', accountId: 'u5', content: 'Pixel art workflow thread. Here is how I create game assets in under 30 minutes...',
    createdAt: new Date(Date.now() - 1000 * 60 * 360).toISOString(), visibility: 'public',
    mediaUrls: [], favouritesCount: 156, boostsCount: 45, repliesCount: 22, isFavourited: false, isBoosted: false, isBookmarked: false,
    hashtags: ['pixelart', 'gamedev', 'tutorial'],
  },
  {
    id: 's12', accountId: 'u6', content: 'Collaboration announcement: Working with @leo on the soundtrack for "Behind the Cloud". Dropping simultaneously with the series.',
    createdAt: new Date(Date.now() - 1000 * 60 * 480).toISOString(), visibility: 'public',
    mediaUrls: [], favouritesCount: 203, boostsCount: 67, repliesCount: 31, isFavourited: false, isBoosted: false, isBookmarked: false,
    hashtags: ['collaboration', 'music', 'jamvideo'],
  },
  {
    id: 's13', accountId: 'u7', content: 'Behind the scenes of our documentary shoot. The server room was 40 degrees but the footage was worth it.',
    createdAt: new Date(Date.now() - 1000 * 60 * 600).toISOString(), visibility: 'public',
    mediaUrls: [], favouritesCount: 89, boostsCount: 19, repliesCount: 12, isFavourited: false, isBoosted: false, isBookmarked: false,
    hashtags: ['bts', 'filmmaking', 'tech'],
  },
  {
    id: 's14', accountId: 'u8', content: 'Student milestone: Over 1 million students have now completed courses on JamLearn. Thank you to everyone who has been part of this journey.',
    createdAt: new Date(Date.now() - 1000 * 60 * 720).toISOString(), visibility: 'public',
    mediaUrls: [], favouritesCount: 567, boostsCount: 234, repliesCount: 156, isFavourited: false, isBoosted: false, isBookmarked: false,
    hashtags: ['milestone', 'education', 'jamlearn'],
  },
  {
    id: 's15', accountId: 'u4', content: 'We are hiring ML engineers! Join Nova AI Labs and work on cutting-edge language models. DM for details.',
    createdAt: new Date(Date.now() - 1000 * 60 * 900).toISOString(), visibility: 'public',
    mediaUrls: [], favouritesCount: 45, boostsCount: 12, repliesCount: 8, isFavourited: false, isBoosted: false, isBookmarked: false,
    hashtags: ['hiring', 'ai', 'jobs'],
  },
  {
    id: 's16', accountId: 'u1', content: 'The JamZia platform now supports 24+ integrated services. JamVideo, JamAudio, JamPlay, JamLearn, JamSocial, JamAds, JamPay, JamShop, JamCloud.',
    createdAt: new Date(Date.now() - 1000 * 60 * 1080).toISOString(), visibility: 'public',
    mediaUrls: [], favouritesCount: 892, boostsCount: 445, repliesCount: 67, isFavourited: false, isBoosted: false, isBookmarked: false,
    hashtags: ['jamzia', 'platform', 'ecosystem'],
  },
  {
    id: 's17', accountId: 'u2', content: 'Dark mode is not a feature, it is a lifestyle. Especially when your brand colors are #000000 #081F5C #7096D1 #F7F2EB',
    createdAt: new Date(Date.now() - 1000 * 60 * 1200).toISOString(), visibility: 'public',
    mediaUrls: [], favouritesCount: 334, boostsCount: 89, repliesCount: 23, isFavourited: false, isBoosted: false, isBookmarked: false,
    hashtags: ['design', 'darkmode'],
  },
  {
    id: 's18', accountId: 'u3', content: 'Implemented the "Who to Follow" recommendation engine today. It analyzes follows-of-follows every 30 seconds. Pretty neat algorithm.',
    createdAt: new Date(Date.now() - 1000 * 60 * 1440).toISOString(), visibility: 'public',
    mediaUrls: [], favouritesCount: 178, boostsCount: 56, repliesCount: 34, isFavourited: false, isBoosted: false, isBookmarked: false,
    hashtags: ['engineering', 'algorithm', 'ml'],
  },
  {
    id: 's19', accountId: 'u5', content: 'Game dev log #42: Added procedural terrain generation to our AR battle royale. Each match now has a unique map.',
    createdAt: new Date(Date.now() - 1000 * 60 * 1680).toISOString(), visibility: 'public',
    mediaUrls: [], favouritesCount: 234, boostsCount: 78, repliesCount: 45, isFavourited: false, isBoosted: false, isBookmarked: false,
    hashtags: ['gamedev', 'procedural', 'ar'],
  },
  {
    id: 's20', accountId: 'u6', content: 'Mixing the final track of the album. It is called "Skyline" and it is the most personal song I have ever written.',
    createdAt: new Date(Date.now() - 1000 * 60 * 1920).toISOString(), visibility: 'public',
    mediaUrls: [], favouritesCount: 445, boostsCount: 123, repliesCount: 89, isFavourited: false, isBoosted: false, isBookmarked: false,
    hashtags: ['music', 'album', 'jamaudio'],
  },
];

// ─── Initial PStates ─────────────────────────────────────

const INITIAL_FOLLOWERS: Record<string, Set<string>> = {
  u1: new Set(['u2', 'u3', 'u4', 'u5', 'u6', 'u7', 'u8']),
  u2: new Set(['u1', 'u3', 'u5', 'u7']),
  u3: new Set(['u1', 'u2', 'u4', 'u6', 'u8']),
  u4: new Set(['u1', 'u3', 'u7']),
  u5: new Set(['u1', 'u2', 'u6', 'u8']),
  u6: new Set(['u1', 'u3', 'u5', 'u7']),
  u7: new Set(['u1', 'u2', 'u4', 'u8']),
  u8: new Set(['u1', 'u3', 'u5']),
};

// ─── Store State ─────────────────────────────────────────

interface SocialState {
  // Current user (logged in as u1 - JamZia Official)
  currentAccountId: string;

  // All accounts
  accounts: Account[];

  // All statuses
  statuses: Status[];

  // PState: follower -> followees
  followerToFollowees: Record<string, string[]>;

  // PState: followee -> followers
  followeeToFollowers: Record<string, string[]>;

  // PState: accountId -> follow requests (for locked accounts)
  accountIdToFollowRequests: Record<string, string[]>;

  // PState: accountId -> suppressions (blocks)
  accountIdToSuppressions: Record<string, string[]>;

  // PState: accountId -> muted accounts
  mutedAccounts: Record<string, string[]>;

  // PState: hashtag -> followers
  hashtagToFollowers: Record<string, string[]>;

  // PState: accountId -> who to follow suggestions
  whoToFollow: Record<string, string[]>;

  // PState: home timeline per account
  homeTimelines: Record<string, string[]>;

  // Notifications
  notifications: Notification[];

  // UI state
  activeTab: 'for-you' | 'following';
  selectedProfileId: string | null;

  // ─── Actions ──────────────────────────────────────
  createStatus: (content: string, visibility: Status['visibility'], hashtags: string[]) => void;
  toggleFavourite: (statusId: string) => void;
  toggleBoost: (statusId: string) => void;
  toggleBookmark: (statusId: string) => void;
  followAccount: (accountId: string) => void;
  unfollowAccount: (accountId: string) => void;
  blockAccount: (accountId: string) => void;
  unblockAccount: (accountId: string) => void;
  muteAccount: (accountId: string) => void;
  unmuteAccount: (accountId: string) => void;
  acceptFollowRequest: (accountId: string) => void;
  rejectFollowRequest: (accountId: string) => void;
  followHashtag: (hashtag: string) => void;
  unfollowHashtag: (hashtag: string) => void;
  setActiveTab: (tab: 'for-you' | 'following') => void;
  setSelectedProfileId: (id: string | null) => void;
  markNotificationRead: (id: string) => void;
  recomputeWhoToFollow: () => void;

  // ─── Getters ──────────────────────────────────────
  getAccount: (id: string) => Account | undefined;
  getStatus: (id: string) => Status | undefined;
  getHomeTimeline: (accountId: string) => Status[];
  getAccountTimeline: (accountId: string) => Status[];
  isFollowing: (followerId: string, followeeId: string) => boolean;
  isBlocked: (accountId: string, targetId: string) => boolean;
  isMuted: (accountId: string, targetId: string) => boolean;
  hasFollowRequest: (accountId: string, requesterId: string) => boolean;
  isFollowingHashtag: (accountId: string, hashtag: string) => boolean;
  getFollowerCount: (accountId: string) => number;
  getFollowingCount: (accountId: string) => number;
  getUnreadNotifications: () => Notification[];
  getWhoToFollowSuggestions: (accountId: string) => Account[];
  getTrendingHashtags: () => { tag: string; count: number }[];
}

// ─── Fanout Algorithm ────────────────────────────────────

function runFanout(
  status: Status,
  followeeToFollowers: Record<string, string[]>,
  mutedAccounts: Record<string, string[]>,
  accountIdToSuppressions: Record<string, string[]>,
  homeTimelines: Record<string, string[]>,
  _statuses: Status[],
): Record<string, string[]> {
  const newTimelines = { ...homeTimelines };

  // Add to author's own timeline
  if (!newTimelines[status.accountId]) newTimelines[status.accountId] = [];
  newTimelines[status.accountId] = [status.id, ...newTimelines[status.accountId]];

  // Skip direct messages for fanout
  if (status.visibility === 'direct') return newTimelines;

  // Fetch followers
  const followers = followeeToFollowers[status.accountId] || [];

  for (const followerId of followers) {
    // Skip if follower blocked the author
    if ((accountIdToSuppressions[followerId] || []).includes(status.accountId)) continue;

    // Skip if follower muted the author
    if ((mutedAccounts[followerId] || []).includes(status.accountId)) continue;

    // If boost, skip if follower is original author
    if (status.boostOfAccountId && status.boostOfAccountId === followerId) continue;

    // If reply, check if follower follows replied-to account (simplified)
    if (status.replyToAccountId) {
      // Reply filtering would check if follower follows replied-to account
    }

    // Add to follower's timeline
    if (!newTimelines[followerId]) newTimelines[followerId] = [];
    newTimelines[followerId] = [status.id, ...newTimelines[followerId]];
  }

  return newTimelines;
}

// ─── Who to Follow Algorithm ─────────────────────────────

function computeWhoToFollow(
  accountId: string,
  followerToFollowees: Record<string, string[]>,
  _followeeToFollowers: Record<string, string[]>,
  accountIdToSuppressions: Record<string, string[]>,
): string[] {
  const myFollowees = followerToFollowees[accountId] || [];
  const myBlocks = accountIdToSuppressions[accountId] || [];

  // Candidate scores: followee-of-followee -> count
  const candidateScores: Record<string, number> = {};

  for (const followeeId of myFollowees) {
    const theirFollowees = followerToFollowees[followeeId] || [];
    for (const candidateId of theirFollowees) {
      if (candidateId === accountId) continue;
      if (myFollowees.includes(candidateId)) continue;
      if (myBlocks.includes(candidateId)) continue;
      candidateScores[candidateId] = (candidateScores[candidateId] || 0) + 1;
    }
  }

  // Sort by score descending, take top 80
  return Object.entries(candidateScores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 80)
    .map(([id]) => id);
}

// ─── Helpers ─────────────────────────────────────────────

function setToArray<T>(set: Set<T>): T[] { return Array.from(set); }

// ─── Store ───────────────────────────────────────────────

export const useSocialStore = create<SocialState>()(
  persist(
    (set, get) => ({
      currentAccountId: 'u1',
      accounts: MOCK_ACCOUNTS,
      statuses: MOCK_STATUSES,

      // Convert initial Sets to arrays for storage
      followerToFollowees: Object.fromEntries(
        Object.entries(INITIAL_FOLLOWERS).map(([k, v]) => [k, setToArray(v)]),
      ),
      followeeToFollowers: {}, // computed below
      accountIdToFollowRequests: {},
      accountIdToSuppressions: {},
      mutedAccounts: {},
      hashtagToFollowers: {
        jamzia: ['u2', 'u3', 'u5'],
        design: ['u2', 'u6'],
        ai: ['u4', 'u8'],
        gaming: ['u5', 'u7'],
        music: ['u6', 'u2'],
        education: ['u8', 'u3'],
        tech: ['u3', 'u4', 'u7'],
        gamedev: ['u5', 'u1'],
        engineering: ['u3', 'u4'],
        art: ['u2', 'u5', 'u6'],
      },
      whoToFollow: {},
      homeTimelines: {},
      notifications: [],
      activeTab: 'for-you',
      selectedProfileId: null,

      // Initialize followeeToFollowers from followerToFollowees
      // Done lazily in getHomeTimeline

      // ─── Actions ──────────────────────────────────

      createStatus: (content, visibility, hashtags) => {
        const state = get();
        const newStatus: Status = {
          id: `s${Date.now()}`,
          accountId: state.currentAccountId,
          content,
          createdAt: new Date().toISOString(),
          visibility,
          mediaUrls: [],
          favouritesCount: 0,
          boostsCount: 0,
          repliesCount: 0,
          isFavourited: false,
          isBoosted: false,
          isBookmarked: false,
          hashtags,
        };

        const newStatuses = [newStatus, ...state.statuses];
        const newTimelines = runFanout(
          newStatus,
          state.followeeToFollowers,
          state.mutedAccounts,
          state.accountIdToSuppressions,
          state.homeTimelines,
          newStatuses,
        );

        set({
          statuses: newStatuses,
          homeTimelines: newTimelines,
        });
      },

      toggleFavourite: (statusId) => {
        const state = get();
        const newStatuses = state.statuses.map((s) => {
          if (s.id !== statusId) return s;
          return {
            ...s,
            isFavourited: !s.isFavourited,
            favouritesCount: s.isFavourited ? s.favouritesCount - 1 : s.favouritesCount + 1,
          };
        });
        set({ statuses: newStatuses });
      },

      toggleBoost: (statusId) => {
        const state = get();
        const newStatuses = state.statuses.map((s) => {
          if (s.id !== statusId) return s;
          return {
            ...s,
            isBoosted: !s.isBoosted,
            boostsCount: s.isBoosted ? s.boostsCount - 1 : s.boostsCount + 1,
          };
        });
        set({ statuses: newStatuses });
      },

      toggleBookmark: (statusId) => {
        const state = get();
        const newStatuses = state.statuses.map((s) =>
          s.id !== statusId ? s : { ...s, isBookmarked: !s.isBookmarked },
        );
        set({ statuses: newStatuses });
      },

      followAccount: (accountId) => {
        const state = get();
        const currentId = state.currentAccountId;
        if (currentId === accountId) return;

        const targetAccount = state.accounts.find((a) => a.id === accountId);

        // If locked account, send follow request instead
        if (targetAccount?.isLocked) {
          const newRequests = {
            ...state.accountIdToFollowRequests,
            [accountId]: [...(state.accountIdToFollowRequests[accountId] || []), currentId],
          };
          set({ accountIdToFollowRequests: newRequests });
          return;
        }

        // Add to follower's followees
        const newFollowees = {
          ...state.followerToFollowees,
          [currentId]: [...(state.followerToFollowees[currentId] || []), accountId],
        };

        // Add to followee's followers
        const newFollowers = {
          ...state.followeeToFollowers,
          [accountId]: [...(state.followeeToFollowers[accountId] || []), currentId],
        };

        set({
          followerToFollowees: newFollowees,
          followeeToFollowers: newFollowers,
        });
      },

      unfollowAccount: (accountId) => {
        const state = get();
        const currentId = state.currentAccountId;

        const newFollowees = {
          ...state.followerToFollowees,
          [currentId]: (state.followerToFollowees[currentId] || []).filter(
            (id) => id !== accountId,
          ),
        };
        const newFollowers = {
          ...state.followeeToFollowers,
          [accountId]: (state.followeeToFollowers[accountId] || []).filter(
            (id) => id !== currentId,
          ),
        };

        set({
          followerToFollowees: newFollowees,
          followeeToFollowers: newFollowers,
        });
      },

      blockAccount: (accountId) => {
        const state = get();
        const currentId = state.currentAccountId;

        // Remove from follow sets (implicit unfollow)
        const newFollowees = {
          ...state.followerToFollowees,
          [currentId]: (state.followerToFollowees[currentId] || []).filter(
            (id) => id !== accountId,
          ),
        };
        const newFollowers = {
          ...state.followeeToFollowers,
          [accountId]: (state.followeeToFollowers[accountId] || []).filter(
            (id) => id !== currentId,
          ),
        };

        // Add to suppressions
        const newSuppressions = {
          ...state.accountIdToSuppressions,
          [currentId]: [...(state.accountIdToSuppressions[currentId] || []), accountId],
        };

        set({
          followerToFollowees: newFollowees,
          followeeToFollowers: newFollowers,
          accountIdToSuppressions: newSuppressions,
        });
      },

      unblockAccount: (accountId) => {
        const state = get();
        const currentId = state.currentAccountId;

        const newSuppressions = {
          ...state.accountIdToSuppressions,
          [currentId]: (state.accountIdToSuppressions[currentId] || []).filter(
            (id) => id !== accountId,
          ),
        };

        set({ accountIdToSuppressions: newSuppressions });
      },

      muteAccount: (accountId) => {
        const state = get();
        const currentId = state.currentAccountId;

        const newMuted = {
          ...state.mutedAccounts,
          [currentId]: [...(state.mutedAccounts[currentId] || []), accountId],
        };

        set({ mutedAccounts: newMuted });
      },

      unmuteAccount: (accountId) => {
        const state = get();
        const currentId = state.currentAccountId;

        const newMuted = {
          ...state.mutedAccounts,
          [currentId]: (state.mutedAccounts[currentId] || []).filter((id) => id !== accountId),
        };

        set({ mutedAccounts: newMuted });
      },

      acceptFollowRequest: (requesterId) => {
        const state = get();
        const currentId = state.currentAccountId;

        // Remove from requests
        const newRequests = {
          ...state.accountIdToFollowRequests,
          [currentId]: (state.accountIdToFollowRequests[currentId] || []).filter(
            (id) => id !== requesterId,
          ),
        };

        // Add to followers (implicit follow)
        const newFollowers = {
          ...state.followeeToFollowers,
          [currentId]: [...(state.followeeToFollowers[currentId] || []), requesterId],
        };

        // Add to requester's followees
        const newFollowees = {
          ...state.followerToFollowees,
          [requesterId]: [...(state.followerToFollowees[requesterId] || []), currentId],
        };

        set({
          accountIdToFollowRequests: newRequests,
          followeeToFollowers: newFollowers,
          followerToFollowees: newFollowees,
        });
      },

      rejectFollowRequest: (requesterId) => {
        const state = get();
        const currentId = state.currentAccountId;

        const newRequests = {
          ...state.accountIdToFollowRequests,
          [currentId]: (state.accountIdToFollowRequests[currentId] || []).filter(
            (id) => id !== requesterId,
          ),
        };

        set({ accountIdToFollowRequests: newRequests });
      },

      followHashtag: (hashtag) => {
        const state = get();
        const currentId = state.currentAccountId;

        const newHashtagFollowers = {
          ...state.hashtagToFollowers,
          [hashtag]: [...(state.hashtagToFollowers[hashtag] || []), currentId],
        };

        set({ hashtagToFollowers: newHashtagFollowers });
      },

      unfollowHashtag: (hashtag) => {
        const state = get();
        const currentId = state.currentAccountId;

        const newHashtagFollowers = {
          ...state.hashtagToFollowers,
          [hashtag]: (state.hashtagToFollowers[hashtag] || []).filter((id) => id !== currentId),
        };

        set({ hashtagToFollowers: newHashtagFollowers });
      },

      setActiveTab: (tab) => set({ activeTab: tab }),
      setSelectedProfileId: (id) => set({ selectedProfileId: id }),

      markNotificationRead: (id) => {
        const state = get();
        const newNotifications = state.notifications.map((n) =>
          n.id === id ? { ...n, read: true } : n,
        );
        set({ notifications: newNotifications });
      },

      recomputeWhoToFollow: () => {
        const state = get();
        const suggestions = computeWhoToFollow(
          state.currentAccountId,
          state.followerToFollowees,
          state.followeeToFollowers,
          state.accountIdToSuppressions,
        );
        set({
          whoToFollow: {
            ...state.whoToFollow,
            [state.currentAccountId]: suggestions,
          },
        });
      },

      // ─── Getters ──────────────────────────────────

      getAccount: (id) => get().accounts.find((a) => a.id === id),
      getStatus: (id) => get().statuses.find((s) => s.id === id),

      getHomeTimeline: (accountId) => {
        const state = get();

        // Build followeeToFollowers if empty (first run)
        let followers = state.followeeToFollowers;
        if (Object.keys(followers).length === 0) {
          const computed: Record<string, string[]> = {};
          for (const [followerId, followees] of Object.entries(state.followerToFollowees)) {
            for (const followeeId of followees) {
              if (!computed[followeeId]) computed[followeeId] = [];
              computed[followeeId].push(followerId);
            }
          }
          followers = computed;
          // Update the store silently
          setTimeout(() => set({ followeeToFollowers: computed }), 0);
        }

        // Build home timeline from statuses
        const timelineIds = state.homeTimelines[accountId];
        if (timelineIds && timelineIds.length > 0) {
          return timelineIds
            .map((id) => state.statuses.find((s) => s.id === id))
            .filter((s): s is Status => !!s);
        }

        // First-time: compute timeline using fanout for all statuses
        let timelines = state.homeTimelines;
        for (const status of [...state.statuses].reverse()) {
          timelines = runFanout(status, followers, state.mutedAccounts, state.accountIdToSuppressions, timelines, state.statuses);
        }
        set({ homeTimelines: timelines });

        return (timelines[accountId] || [])
          .map((id) => state.statuses.find((s) => s.id === id))
          .filter((s): s is Status => !!s);
      },

      getAccountTimeline: (accountId) => {
        return get().statuses.filter((s) => s.accountId === accountId);
      },

      isFollowing: (followerId, followeeId) => {
        return (get().followerToFollowees[followerId] || []).includes(followeeId);
      },

      isBlocked: (accountId, targetId) => {
        return (get().accountIdToSuppressions[accountId] || []).includes(targetId);
      },

      isMuted: (accountId, targetId) => {
        return (get().mutedAccounts[accountId] || []).includes(targetId);
      },

      hasFollowRequest: (accountId, requesterId) => {
        return (get().accountIdToFollowRequests[accountId] || []).includes(requesterId);
      },

      isFollowingHashtag: (accountId, hashtag) => {
        return (get().hashtagToFollowers[hashtag] || []).includes(accountId);
      },

      getFollowerCount: (accountId) => {
        return (get().followeeToFollowers[accountId] || []).length;
      },

      getFollowingCount: (accountId) => {
        return (get().followerToFollowees[accountId] || []).length;
      },

      getUnreadNotifications: () => {
        return get().notifications.filter((n) => !n.read);
      },

      getWhoToFollowSuggestions: (accountId) => {
        const state = get();
        let suggestions = state.whoToFollow[accountId];

        if (!suggestions || suggestions.length === 0) {
          suggestions = computeWhoToFollow(
            accountId,
            state.followerToFollowees,
            state.followeeToFollowers,
            state.accountIdToSuppressions,
          );
          // Cache it
          setTimeout(
            () =>
              set({
                whoToFollow: { ...state.whoToFollow, [accountId]: suggestions },
              }),
            0,
          );
        }

        return suggestions
          .slice(0, 3)
          .map((id) => state.accounts.find((a) => a.id === id))
          .filter((a): a is Account => !!a);
      },

      getTrendingHashtags: () => {
        const state = get();
        const tagCounts: Record<string, number> = {};

        for (const status of state.statuses) {
          for (const tag of status.hashtags) {
            tagCounts[tag] = (tagCounts[tag] || 0) + 1;
          }
        }

        return Object.entries(tagCounts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 8)
          .map(([tag, count]) => ({ tag, count }));
      },
    }),
    {
      name: 'jamzia-social-store',
      partialize: (state) => ({
        followerToFollowees: state.followerToFollowees,
        followeeToFollowers: state.followeeToFollowers,
        accountIdToFollowRequests: state.accountIdToFollowRequests,
        accountIdToSuppressions: state.accountIdToSuppressions,
        mutedAccounts: state.mutedAccounts,
        hashtagToFollowers: state.hashtagToFollowers,
        whoToFollow: state.whoToFollow,
        homeTimelines: state.homeTimelines,
        notifications: state.notifications,
        statuses: state.statuses,
      }),
    },
  ),
);
