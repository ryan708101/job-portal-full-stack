import { clerkClient } from '@clerk/express';
import User from '../models/User.js';


export const ensureUserInDb = async (req, res, next) => {
    try {
        const clerkUserId = req.auth?.userId;
        if (!clerkUserId) {
            return res.status(401).json({ success: false, message: 'Not authenticated' });
        }

        let user = await User.findById(clerkUserId);
        if (!user) {
            const clerkUser = await clerkClient.users.getUser(clerkUserId);
            if (!clerkUser) {
                return res.status(404).json({ success: false, message: 'Clerk user not found' });
            }

            user = await User.create({
                _id: clerkUserId,
                name: `${clerkUser.firstName} ${clerkUser.lastName}`,
                email: clerkUser.emailAddresses[0]?.emailAddress || '',
                image: clerkUser.imageUrl || '',
            });
        }

        req.dbUser = user;
        next();
    } catch (error) {
        console.error('[ensureUserInDb] Error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};
