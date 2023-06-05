// ANCHOR: Main tables
const Brand = require('./food/food_brand');
const Food  = require('./food/food');
const User  = require('./user/user');
// const Scan  = require('./scan');   // NOTE: Not used
// const Auth  = require('./auth');   // NOTE: Not used

// ANCHOR: Additional tables
const Notifs       = require('./notifications');

const FoodCategory = require('./food/food_category');
const FoodBrand    = require('./food/food_brand'   );
const FoodHistory  = require('./food/food_history' );

const UserHistory  = require('./user/user_history' );
const UserTokens   = require('./user/user_tokens'  );
const UserNotif    = require('./user/user_notif'   );



// Food & Category
Food.belongsTo(FoodCategory, { foreignKey: 'category_id' });
FoodCategory.hasMany(Food,   { foreignKey: 'category_id' });

// Food & Brand
Food.belongsTo(FoodBrand,    { foreignKey: 'brand_id'    });
FoodBrand.hasMany(Food,      { foreignKey: 'brand_id'    });

// Food History
Food.belongsToMany(
  UserHistory,
  {
    through: 'UserHistoryFood',
    foreignKey: 'food_id',
    otherKey: 'history_id',
  }
);
UserHistory.belongsToMany(
  Food,
  {
    through: 'UserHistoryFood',
    foreignKey: 'food_id',
    otherKey: 'history_id',
  }
);

// User & Food History
User.hasMany(FoodHistory,    { foreignKey: 'user_id'     });
FoodHistory.belongsTo(User,  { foreignKey: 'user_id'     });

// User & Logged out Tokens
User.hasMany(UserTokens,     { foreignKey: 'user_id'     });
UserTokens.belongsTo(User,   { foreignKey: 'user_id'     });

// User & Notifications
// (user < user_notif on User.id = user_notif.user_id,
//  user_notif > notif on user_notif.notification_id = notification.id)
User.belongsToMany(
  Notifs,
  {
    through: UserNotif,
    foreignKey: 'user_id',
    otherKey: 'notification_id',
  }
);
Notifs.belongsToMany(
  User,
  {
    through: UserNotif,
    foreignKey: 'notification_id',
    otherKey: 'user_id',
  }
);


const Models = {
  User : User,
  Food : Food,
  Brand: Brand,
  // Scan : Scan,   // NOTE: Not used
  // Auth : Auth,   // NOTE: Not used

  Notifs      : Notifs,
  
  FoodCategory: FoodCategory,
  FoodBrand   : FoodBrand,
  // FoodHistory : FoodHistory,   // NOTE: Not used

  UserHistory : UserHistory,
  UserTokens  : UserTokens,
  UserNotif   : UserNotif,
};

module.exports = Models;
