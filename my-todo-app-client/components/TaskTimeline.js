export default function TaskTimeline({ dueDate }) {
    const currentTime = new Date();
    const timeRemaining = (new Date(dueDate) - currentTime) / (1000 * 60 * 60 * 24); // Time in days
  
    let timelineStyle = "bg-green-500";
    if (timeRemaining < 0.6) {
      timelineStyle = "bg-orange-500";
    } else if (timeRemaining < 0.3) {
      timelineStyle = "bg-red-500";
    }
  
    return (
      <div className={`text-white py-1 px-3 rounded-md ${timelineStyle}`}>
        {timeRemaining.toFixed(1)} days remaining
      </div>
    );
  }
  