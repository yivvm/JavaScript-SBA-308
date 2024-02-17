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

  // Parse submission data.
  //   console.log(`Submission Data:`, submissions );
  // Check to see if the submission was late; if so, deduct 10% of the maximum possible points.
  // Find existing data for this learner, if any.
  // If the learner already has data, add the new score to the existing data.
  // Calculate the average score for each learner and remove the extra data.

  //==== PUT CODE HERE =====//

  // 1. create a list of learners with a list of submission information
  const learners = {};
  submissions.forEach((submit) => {
    if (!(submit.learner_id in learners)) {
      learners[submit.learner_id] = [
        [
          submit.assignment_id,
          submit.submission.submitted_at,
          submit.submission.score,
        ],
      ];
    } else {
      learners[submit.learner_id].push([
        submit.assignment_id,
        submit.submission.submitted_at,
        submit.submission.score,
      ]);
    }
  });

  console.log(learners);

  // 2. create a list of learners' id
  const learners_id = Object.keys(learners);
  console.log(learners_id);

  // 3. create the result list of objects/learners
  const learners_avg = [];
  // for each learner
  learners_id.forEach((id) => {
    console.log(learners[id]);
    const all_submits = learners[id];

    // for final output and the format: the ID of the learner for which this data has been collected
    let learner_info = { id: id };

    // get the average for each learner
    let sum_score = 0;
    let sum_total = 0;
    let avg;
    for (const submit of all_submits) {
      const assignment = ag.assignments.find((a) => a.id === submit[0]);
      // console.log(assignment)

      // if an assignment is not yet due, do not include it in the results
      if (assignment.due_at < '2024-02-16') {
        let actual_score = submit[2];
        
        // if the learner's submission is late, deduct 10% of the total points_possible from their score of that assignment
        if (submit[1] > assignment.due_at) {
          actual_score -= assignment.points_possible * 0.1;
        } 
        
        sum_score += actual_score;
        sum_total += assignment.points_possible;
        avg = sum_score / sum_total;
        avg = avg.toFixed(3); // to have exactly three decimal digits
        // for final output and the format: the learner's weighted average score
        learner_info["avg"] = avg;

        // for final output and the format: each assignment: submission.score / points_possible
        learner_info[submit[0]] = (
          actual_score / assignment.points_possible
        ).toFixed(3);
      }
    }
    
    console.log(sum_score, sum_total, avg);
    console.log(learner_info);
  });

    // console.log(learners_avg);

  return results;
}

console.log(getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions))
const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

console.log(result);

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
