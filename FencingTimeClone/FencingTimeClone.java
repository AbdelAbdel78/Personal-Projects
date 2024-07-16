package FencingTimeClone;

import javax.swing.*;
import java.awt.*;

public class FencingTimeClone {
    public static void main(String[] args) {
        // Create a JFrame (window) to hold the GUI components
        JFrame frame = new JFrame("GUI Box Example");

        // Set the size of the frame
        frame.setSize(400, 300);

        // Set the layout manager for the frame's content pane
        frame.setLayout(new FlowLayout());

        // Create a JPanel to act as the GUI box
        JPanel guiBox = new JPanel();
        guiBox.setPreferredSize(new Dimension(300, 200));
        guiBox.setBorder(BorderFactory.createLineBorder(Color.black));

        // Add the guiBox panel to the frame
        frame.add(guiBox);

        // Set the frame to be visible
        frame.setVisible(true);

        // Set the operation to close the frame when the close button is clicked
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    }
}