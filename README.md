# Raintor Frontend

A production-quality Next.js 15 frontend demonstrating real-time location
sharing with SignalR and infinite scrolling user feed.

## Features

### 🗺️ Real-Time Location Sharing

- **SignalR WebSocket Integration**: Real-time bidirectional communication
- **Interactive Map**: Leaflet-based map with live location updates
- **Sender/Receiver UI**: Separate interfaces for sending and receiving
  locations
- **Custom Hook**: `useSignalR()` for connection management
- **TypeScript Support**: Full type safety for location data

### 👥 Infinite Scroll User Feed

- **Optimized Performance**: Intersection Observer API for smooth scrolling
- **Search Functionality**: Real-time filtering across user data
- **Skeleton Loading**: Smooth loading states
- **Error Handling**: Graceful error recovery with retry functionality
- **Accessibility**: ARIA labels and keyboard navigation support

### 🎨 Modern UI/UX

- **Tailwind CSS**: Clean, responsive design
- **shadcn/ui Components**: Consistent, accessible UI components
- **Mobile-First**: Responsive design for all screen sizes
- **Loading States**: Clear feedback during data fetching

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Real-time**: @microsoft/signalr
- **Maps**: Leaflet
- **State Management**: React Hooks
- **API**: Fetch API with error handling

## Getting Started

1. **Clone and Install**:

   ```bash
   git clone https://github.com/khaledssbd/Raintor-Location-Sharing
   cd Raintor-Location-Sharing
   npm install
   ```

2. **Environment Setup**:

   ```bash
   cp .env.example .env
   # Edit .env with your SignalR server & API BASE URL
   ```

3. **Development**:

   ```bash
   npm run dev
   ```

4. **Production Build**:
   ```bash
   npm run build
   npm start
   ```

## Environment Variables

- `NEXT_PUBLIC_SIGNALR_URL`: Your SignalR hub URL
- `NEXT_PUBLIC_API_BASE_URL`: API base URL

## Project Structure

```
├── app/                   # Next.js App Router pages
├── components/            # Reusable UI components
│   ├── location/          # Location sharing components
│   ├── users/             # User feed components
│   └── ui/                # shadcn/ui components
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
├── services/              # API services
└── types/                 # TypeScript type definitions
```

## Key Components

- **LocationSharing**: Main location sharing interface
- **MapView**: Interactive map with real-time updates
- **UserFeed**: Infinite scrolling user list
- **UserCard**: Individual user display component
- **useSignalR**: Custom hook for SignalR connection management

## Performance Optimizations

- **Intersection Observer**: Efficient infinite scrolling
- **Dynamic Imports**: Leaflet loaded client-side only
- **Memoization**: Optimized re-renders
- **Error Boundaries**: Graceful error handling
- **Skeleton Loading**: Improved perceived performance

## Browser Support

- Modern browsers with WebSocket support
- Mobile browsers (iOS Safari, Chrome Mobile)
- Progressive enhancement for older browsers

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details
