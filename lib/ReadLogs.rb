class ReadLogs
  def read(filename)
    file_str = IO.read("#{Rails.root}/log/" + filename)
    formatted_str = file_str.gsub(/\n{2,5}/, "<br /> <br />")
    formatted_str = formatted_str.gsub(/\n{1,2}/, "<br />")
    
    logs_arr = formatted_str.split("<br /> <br />")

    return logs_arr
  end
  
  
  def clear(filename)
    File.write("#{Rails.root}/log/" + filename, '')
  end
  
  def size(filename)
    return File.size?("#{Rails.root}/log/" + filename)
  end
end