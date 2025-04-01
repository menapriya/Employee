import React, { useState } from "react";
import { Bell } from "lucide-react";
import { Card, CardContent } from "./ui/card"; 
import { Button } from "./ui/button";


const notificationsData = [
  { id: 1, message: "New leave request received", read: false },
  { id: 2, message: "Salary processed successfully", read: true },
  { id: 3, message: "Meeting scheduled for tomorrow", read: false },
];

const Notifications = () => {
  const [notifications, setNotifications] = useState(notificationsData);
  const [open, setOpen] = useState(false);

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  return (
    <div className="relative">
      <Button variant="ghost" onClick={() => setOpen(!open)}>
        <Bell className="w-6 h-6" />
        {notifications.some((notif) => !notif.read) && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
            {notifications.filter((notif) => !notif.read).length}
          </span>
        )}
      </Button>
      {open && (
        <Card className="absolute right-0 mt-2 w-64 shadow-lg bg-white rounded-lg">
          <CardContent>
            <div className="text-lg font-semibold mb-2">Notifications</div>
            {notifications.length > 0 ? (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`p-2 border-b cursor-pointer ${notif.read ? "text-gray-500" : "font-bold"}`}
                  onClick={() => markAsRead(notif.id)}
                >
                  {notif.message}
                </div>
              ))
            ) : (
              <div className="text-gray-500 text-center">No new notifications</div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Notifications;
