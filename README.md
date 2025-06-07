# OCR Reader 📖

A modern, responsive web application for extracting text from images using Optical Character Recognition (OCR) technology. Built with React, TypeScript, and Tesseract.js.

![OCR Reader Screenshot](https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop)

## ✨ Features

- **Drag & Drop Interface**: Simply drag and drop images or click to upload
- **Real-time Processing**: Watch the OCR progress with a live progress bar
- **Image Preview**: Zoom in/out functionality for better image inspection
- **Text Editing**: Edit extracted text directly in the interface
- **Export Options**: Copy to clipboard or download as text file
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **High Accuracy**: Powered by Tesseract.js for reliable text recognition
- **Multiple Formats**: Supports various image formats (PNG, JPG, JPEG, etc.)

## 🚀 Live Demo

Visit the live application: [OCR Reader](https://chimerical-mousse-6d046e.netlify.app)

## 🛠️ Technologies Used

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS for responsive design
- **OCR Engine**: Tesseract.js for text extraction
- **Icons**: Lucide React for beautiful icons
- **Build Tool**: Vite for fast development and building
- **Deployment**: Netlify for hosting

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ocr-reader.git
   cd ocr-reader
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🎯 Usage

1. **Upload an Image**
   - Drag and drop an image file onto the upload area
   - Or click the "Upload Image" button to select a file

2. **Extract Text**
   - Click the "Extract Text" button to start OCR processing
   - Watch the progress bar as the text is being extracted

3. **Review and Edit**
   - View the extracted text in the output panel
   - Click the edit button to modify the text if needed
   - Check the confidence score to assess accuracy

4. **Export Results**
   - Copy the text to your clipboard
   - Download the text as a `.txt` file
   - Use the extracted text in your projects

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx      # App header with theme toggle
│   ├── Footer.tsx      # App footer
│   ├── ImageUploader.tsx # Image upload and preview
│   └── TextOutput.tsx  # Text display and editing
├── context/            # React context providers
│   └── ThemeContext.tsx # Dark/light theme management
├── types/              # TypeScript type definitions
│   └── index.ts        # Shared interfaces
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

## 🎨 Features in Detail

### Image Processing
- **Multiple Format Support**: PNG, JPG, JPEG, GIF, BMP, and more
- **Image Preview**: Real-time preview with zoom controls
- **Drag & Drop**: Intuitive file upload experience

### OCR Capabilities
- **High Accuracy**: Tesseract.js engine for reliable text recognition
- **Progress Tracking**: Real-time progress updates during processing
- **Confidence Scoring**: Quality assessment of extracted text

### User Experience
- **Responsive Design**: Optimized for all screen sizes
- **Dark Mode**: Eye-friendly dark theme option
- **Accessibility**: ARIA labels and keyboard navigation support
- **Error Handling**: Graceful error messages and recovery

## 🌟 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Tesseract.js](https://tesseract.projectnaptha.com/) - OCR engine
- [Lucide React](https://lucide.dev/) - Beautiful icons
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Vite](https://vitejs.dev/) - Next generation frontend tooling

## 📞 Support

If you have any questions or need help, please open an issue on GitHub or contact the maintainers.

---

Made with ❤️ by [Your Name]