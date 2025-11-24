export function generateMessage(username, text) {
      return {
        username,
        text,
        createdAt: Date.now()
      }
    }
    
    export function generateLocationMessage(username, url) {
      return {
        username,
        url,
        createdAt: Date.now()
      }
    }