import 'dotenv/config';
import { ServerService } from './services/server.service';

// Start the background process to poll for chat messages
ServerService.startBackgroundChatPollProcess()

// Start the HTTP and web socket servers
ServerService.startServer();