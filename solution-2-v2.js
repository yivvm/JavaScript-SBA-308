// The provided course information.
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript",
};

// The provided assignment group.
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50,
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150,
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500,
    },
  ],
};

// The provided learner submission data.
const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47,
    },
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150,
    },
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400,
    },
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39,
    },
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140,
    },
  },
];

function getLearnerData(course, ag, submissions) {
  const results = [];

  // done: Parse submission data.
  // console.log(`Submission Data:`, submissions );
  // done: Check to see if the submission was late; if so, deduct 10% of the maximum possible points.
  // Find existing data for this learner, if any.
  // If the learner already has data, add the new score to the existing data.
  // Calculate the average score for each learner and remove the extra data.

  //==== PUT CODE HERE =====//

  submissions.forEach((submit) => {
    const assignment = ag.assignments.find(
      (a) => a.id === submit.assignment_id
    );

    // 1. if an assignment is not yet due, do not include it in the results
    if (new Date(assignment.due_at) > new Date()) {
      return;
    } else {
      let actual_score = submit.submission.score;

      // 2. check if there's any existing data for this learner
      let learner_info = results.find((l) => l.id === submit.learner_id);

      // 3. if there's no existing data:
      if (!learner_info) {
        learner_info = {
          id: submit.learner_id,
        };

        results.push(learner_info);
      }

      // 4. if there's existing data:
      // if the learner's submission is late, deduct 10% of the total points_possible from their score of that assignment
      if (
        new Date(submit.submission.submitted_at) > new Date(assignment.due_at)
      ) {
        actual_score =
          submit.submission.score - assignment.points_possible * 0.1;
      }

      let sum_score = actual_score;
      let sum_total = assignment.points_possible;

      // update the avg, and remove the previous avg, if there's any previous assignment submission
      for (const key in learner_info) {
        const prev_assignment = ag.assignments.find(
          (a) => a.id === Number(key)
        );
        if (!prev_assignment) {
          break;
        } else {
          sum_score += learner_info[key] * prev_assignment.points_possible;
          sum_total += prev_assignment.points_possible;
        }
      }
      learner_info["avg"] = Number((sum_score / sum_total).toFixed(3));

      // remove items from objects
      delete learner_info[assignment.id]; // is not necessary
      // add new assignment_id and its percentage to learner_info
      learner_info[Number(assignment.id)] = Number(
        (actual_score / assignment.points_possible).toFixed(3)
      );
    }
  });

  return results;
}

// 5. check the validation of the input data
function validateAssignmentSubmisstion(course, ag, submissions) {
  // if an AssignmentGroup does not belong to its course, throw an error.
  if (ag.course_id !== course.id) {
    throw new Error(
      "Error: the AssignmentGroup does not belong to its course."
    );
  }

  // if points_possible is 0, throw an error.
  ag.assignments.forEach((assignment) => {
    if (assignment.points_possible === 0) {
      throw new Error("Error: the points_possible cannot be 0.");
    }
    // if a value is a string instead of a number, throw an error.
    if (typeof(assignment.points_possible) !== "number" || isNaN(assignment.points_possible)) {
      throw new Error("Error: the points_possible should be a number.");
    }
  });

  // if a value is a string instead of a number, throw an error.
  submissions.forEach((submit) => {
    if (typeof(submit.submission.score) !== "number" || isNaN(submit.submission.score)) {
      throw new Error("Error: the score should be a number.");
    }
  });
}

try {
  validateAssignmentSubmisstion(CourseInfo, AssignmentGroup, LearnerSubmissions);
  const result = getLearnerData(
    CourseInfo,
    AssignmentGroup,
    LearnerSubmissions
  );
  console.log(result);
} catch (error) {
  console.log(error.message);
}

// --- FYI ----------------
// const example_result = [
//     {
//       id: 125,
//       avg: 0.985, // (47 + 150) / (50 + 150)
//       1: 0.94, // 47 / 50
//       2: 1.0, // 150 / 150
//     },
//     {
//       id: 132,
//       avg: 0.82, // (39 + 125) / (50 + 150)
//       1: 0.78, // 39 / 50
//       2: 0.833, // late: (140 - 15) / 150
//     },
//   ];
