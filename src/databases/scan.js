const { Sequelize, QueryTypes } = require('sequelize');
const db = require('./index');
const Models = require('../models');
const uuid = require('node-uuid');

class DBScan {
  constructor() {
    this.UserHistoryModel = Models.UserHistory;
    this.UserModel = Models.User;
    this.FoodModel = Models.Food;
    this.FoodHistoryModel  = Models.FoodHistory;
    this.FoodCategoryModel = Models.FoodCategory;
  }

  async findAll(username, offset, limit) {
    // Get all user history entries
    const results = await db.query(
      `SELECT
          A.username, BIN_TO_UUID(B.id) as id, BIN_TO_UUID(A.id) as uid, B.photo, B.time, BIN_TO_UUID(D.id) as food_id,
          D.name, E.name AS category, D.callories, CONCAT(D.portion, D.unit) AS portion
        FROM NutriScan.user_history AS B
          JOIN NutriScan.food AS D
            ON B.food_id = D.id
          JOIN NutriScan.user_account AS A
            ON B.user_id = A.id
          JOIN NutriScan.food_category AS E
            ON D.category_id = E.id
          WHERE 
            A.username = "${username}"
          ORDER BY
            time DESC
          LIMIT ${limit} OFFSET ${offset}
      ;`,
      {
        type : QueryTypes.SELECT,
      }
    );

    // 
    const countQuery = await db.query(
      `SELECT
          COUNT(*) AS count
        FROM NutriScan.user_history AS B
          JOIN NutriScan.user_account AS A
            ON B.user_id = A.id
          WHERE
            A.username = "${username}"
      ;`,
      {
        type : QueryTypes.SELECT,
      }
    );
    
    const data = {
      data       : results, // the records for the current page
      count      : countQuery[0].count, // the total number of records
      totalPages : Math.ceil(countQuery[0].count / limit), // the total number of pages
      currentPage: (offset / limit + 1), // the current page number
    };

    console.log("data:");
    console.log(data);

    return data;
  }

  async findById(id) {
    return this.UserHistoryModel
      .findOne({
        where: { id: uuid.parse(id, new Buffer.alloc(16)) },
        // raw: true,
      })
      .then((user) => user);
  }

  // async findByEmail(email) {
  //   return this.UserHistoryModel
  //     .findOne({
  //       where: { email },
  //       raw: true,
  //     })
  //     .then((user) => user);
  // }

  async findByUsername(username) {
    return this.UserHistoryModel
      .findAndCountAll({
        where: {
          user_id: Sequelize.literal(
            `(SELECT user_account.id AS user_id FROM user_account WHERE user_account.username = ${username})`
          ),
        },
        raw: true,
      })
      .then((result) => ({
        count: result.count, // the total number of records
        data : result.rows, // the records for the current page
        totalPages : Math.ceil(result.count / limit), // the total number of pages
        currentPage: (offset / limit + 1) // the current page number
      }));
  }

  async findByUsernameAndTime(username, time) {
    console.log(`findByUsernameAndTime: ${username} && ${time}`);
    // return this.UserHistoryModel
    //   .findOne({
    //     include: [
    //       {
    //         model: this.UserModel,
    //         // attributes: [],
    //         where: { username: username },
    //       },
    //       {
    //         model: this.FoodModel,
    //         attributes: ['id', 'name'],
    //         through: { attributes: [] },
    //         include: [
    //           {
    //             model: this.FoodCategoryModel,
    //             // attributes: [],
    //           },
    //         ],
    //         as: "Food",
    //         // attributes: [
    //         //   // 'id', 'name', 'photo',
    //         //   // 'portion', 'unit', 'callories',

    //         //   // Food Category
    //         //   // [Sequelize.col('FoodCategory.name'), 'category' ],
    //         // ],
    //       },
    //     ],
    //     where: {
    //       time: time,
    //       // user_id: Sequelize.literal(
    //       //   `(SELECT user_account.id AS user_id FROM user_account WHERE user_account.username = ${username})`
    //       // ),
    //     },
    //     // attributes: [
    //     //   // Scan Data
    //     //   'id', 'photo', 'time',

    //     //   // User Data
    //     //   [Sequelize.col('User.name'),         'name'     ],
    //     //   [Sequelize.col('User.username'),     'username' ],

    //     //   // Food Data
    //     //   // [Sequelize.col('Food.name'),         'name'     ],
    //     //   // [Sequelize.col('Food.portion'),      'portion'  ],
    //     //   // [Sequelize.col('Food.unit'),         'unit'     ],
    //     //   // [Sequelize.col('Food.callories'),    'callories'],

    //     //   // Food Category
    //     //   // [Sequelize.col('Food.category'),     'category' ],
    //     // ],
    //     // raw: true,
    //   })
    //   .then((result) => result);
    return db.query(
      `SELECT A.username, BIN_TO_UUID(B.id) as id, BIN_TO_UUID(A.id) as uid,
          B.photo, B.time, BIN_TO_UUID(D.id) as food_id , D.name,
          E.name AS category, D.callories, CONCAT(D.portion, D.unit) AS portion
        FROM user_history AS B
          JOIN food AS D
            ON B.food_id = D.id
          JOIN user_account AS A
            ON B.user_id = A.id
          JOIN food_category AS E
            ON D.category_id = E.id
          WHERE A.username = "${username}"
            AND B.time = "${time}"
      ;`,
      {
        type : QueryTypes.SELECT,
      }
    );
  }

  async create(data) {
    // const food = await this.FoodModel.findByName(data.food);
    // if (!food) throw new Error(`Food ${data.food} does not exist`);

    // console.log(data);
    const insertResult = db.query(
      `INSERT INTO NutriScan.user_history (user_id, photo, time, food_id)
        VALUES (
          (SELECT user_account.id AS user_id FROM NutriScan.user_account AS user_account WHERE user_account.username = ?),
          ?,
          ?,
          (SELECT food.id AS food_id FROM NutriScan.food AS food WHERE food.name = ?)
        )
      ;`,
      {
        type: QueryTypes.INSERT,
        replacements: [
          data.username,
          data.photo,
          data.time,
          data.foodname,
        ]
      }
    );
    console.log(`insertResult: ${JSON.stringify(insertResult)}`);
    return insertResult;
    // const userHistoryCreated = await this.UserHistoryModel
    // return this.UserHistoryModel
    //   .create(
    //     {
    //       user_id: Sequelize.literal(
    //         `(SELECT user_account.id AS user_id FROM user_account WHERE user_account.username = "${data.username}")`
    //       ),
    //       food_id: Sequelize.literal(
    //         `(SELECT food.id AS food_id FROM food WHERE food.name = "${data.foodname}")`
    //       ),
    //       photo: data.photo,
    //       time: data.time,
    //     },
    //     {
    //       attributes: ['user_id', 'food_id', 'photo', 'time'],
    //       // returning: true,
    //       // raw: true,
    //     }
    //   )
    //   .then((result) => result);
  }

  async update(id, username) {
    return this.UserHistoryModel
      .update(user, {
        include: [
          {
            model: this.FoodModel,
            attributes: [
              'id', 'name', 'photo',
              'portion', 'unit', 'callories'
            ],
          },
          {
            model: this.FoodCategoryModel,
            attributes: [
              'name'
            ],
          }
        ],
        where: {
          id,
          user_id: Sequelize.literal(
            `(SELECT user_account.id AS user_id FROM user_account WHERE user_account.username = "${data.username}")`
          ),
        },
      })
      .then((result) => result);
  }

  async deleteById(id) {
    return this.UserHistoryModel
      .destroy({
        where: {
          id: parseInt(id, 10),
        },
      })
      .then((result) => result);
  }
}

module.exports = DBScan;
