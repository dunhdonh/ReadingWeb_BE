'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // USERS
    await queryInterface.bulkInsert("Users", [
      {
        user_id: 1,
        username: "admin",
        email: "admin@example.com",
        password_hash: "$2b$10$N9qo8uLOickgx2ZMRZoMy.Mrq5j5G1f2jM7kQKJ0X0sB7Fh5l2N8K",
        credit_balance: 1000,
        is_premium: true,
        avatar_url: null,
        role: "admin",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 2,
        username: "alice",
        email: "alice@example.com",
        password_hash: "$2b$10$N9qo8uLOickgx2ZMRZoMy.Mrq5j5G1f2jM7kQKJ0X0sB7Fh5l2N8K",
        credit_balance: 200,
        is_premium: false,
        avatar_url: null,
        role: "user",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    // CATEGORIES
    await queryInterface.bulkInsert("Categories", [
      {
        category_id: 1,
        name: "Programming",
        parent_id: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        category_id: 2,
        name: "Machine Learning",
        parent_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    // DOCUMENTS
    await queryInterface.bulkInsert("Documents", [
      {
        doc_id: 1,
        uploader_id: 1,
        category_id: 1,
        title: "Java Core Guide",
        description: "Java learning material",
        file_url: "/docs/java.pdf",
        thumbnail_url: "/thumb/java.png",
        file_type: "pdf",
        price_credits: 20,
        status: "approved",
        view_count: 50,
        download_count: 10,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        doc_id: 2,
        uploader_id: 2,
        category_id: 2,
        title: "ML Introduction",
        description: "Machine learning basic",
        file_url: "/docs/ml.pdf",
        thumbnail_url: "/thumb/ml.png",
        file_type: "pdf",
        price_credits: 40,
        status: "approved",
        view_count: 100,
        download_count: 30,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    // WISHLISTS
    await queryInterface.bulkInsert("Wishlists", [
      {
        user_id: 1,
        doc_id: 2,
        added_at: new Date(),
      },
      {
        user_id: 2,
        doc_id: 1,
        added_at: new Date(),
      },
    ]);

    // TRANSACTIONS
    await queryInterface.bulkInsert("Transactions", [
      {
        transaction_id: 1,
        user_id: 2,
        amount: 100,
        type: "top-up",
        description: "Top up credits",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        transaction_id: 2,
        user_id: 2,
        amount: -20,
        type: "purchase",
        description: "Purchased Java Core Guide",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    // UNLOCKS
    await queryInterface.bulkInsert("Unlocks", [
      {
        unlock_id: 1,
        user_id: 2,
        doc_id: 1,
        unlocked_at: new Date(),
      },
      {
        unlock_id: 2,
        user_id: 1,
        doc_id: 2,
        unlocked_at: new Date(),
      },
    ]);

    // READING PROGRESS
    await queryInterface.bulkInsert("ReadingProgresses", [
      {
        progress_id: 1,
        user_id: 2,
        doc_id: 1,
        last_page: 15,
        total_pages: 100,
        updated_at: new Date(),
      },
      {
        progress_id: 2,
        user_id: 1,
        doc_id: 2,
        last_page: 30,
        total_pages: 120,
        updated_at: new Date(),
      },
    ]);

    // REVIEWS
    await queryInterface.bulkInsert("Reviews", [
      {
        review_id: 1,
        user_id: 2,
        doc_id: 1,
        rating: 5,
        comment: "Very useful",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        review_id: 2,
        user_id: 1,
        doc_id: 2,
        rating: 4,
        comment: "Good document",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    // ANNOTATIONS
    await queryInterface.bulkInsert("Annotations", [
      {
        annotation_id: 1,
        user_id: 2,
        doc_id: 1,
        page_number: 5,
        content: "Important concept",
        color_code: "#FFFF00",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        annotation_id: 2,
        user_id: 1,
        doc_id: 2,
        page_number: 10,
        content: "Need review",
        color_code: "#00FF00",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    // REPORTS
    await queryInterface.bulkInsert("Reports", [
      {
        report_id: 1,
        reporter_id: 2,
        doc_id: 1,
        reason: "Incorrect content",
        status: "pending",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        report_id: 2,
        reporter_id: 1,
        doc_id: 2,
        reason: "Duplicate",
        status: "resolved",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    // ADMIN LOGS
    await queryInterface.bulkInsert("AdminLogs", [
      {
        log_id: 1,
        admin_id: 1,
        action: "APPROVE_DOCUMENT",
        target_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        log_id: 2,
        admin_id: 1,
        action: "DELETE_REPORT",
        target_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    // DOCUMENT TAGS
    await queryInterface.bulkInsert("DocumentTags", [
      {
        doc_id: 1,
        tag_name: "java",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        doc_id: 2,
        tag_name: "machine-learning",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

  },

  async down (queryInterface, Sequelize) {
   await queryInterface.bulkDelete("DocumentTags", null, {});
    await queryInterface.bulkDelete("AdminLogs", null, {});
    await queryInterface.bulkDelete("Reports", null, {});
    await queryInterface.bulkDelete("Annotations", null, {});
    await queryInterface.bulkDelete("Reviews", null, {});
    await queryInterface.bulkDelete("ReadingProgresses", null, {});
    await queryInterface.bulkDelete("Unlocks", null, {});
    await queryInterface.bulkDelete("Transactions", null, {});
    await queryInterface.bulkDelete("Wishlists", null, {});
    await queryInterface.bulkDelete("Documents", null, {});
    await queryInterface.bulkDelete("Categories", null, {});
    await queryInterface.bulkDelete("Users", null, {});
  }
};
