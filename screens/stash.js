<View style={tw.style("px-4 mt-6")}>
  <Text style={tw.style("text-[15px] pb-2")}>
    Do you want to share your thoughts on this song?
  </Text>

  <TextInput
    placeholder="Start typing here..."
    textAlignVertical="top"
    numberOfLines={4}
    style={tw.style("rounded-xl bg-gray-200 p-2")}
  />

  {/* emoji select */}
  <View style={tw.style("mt-6")}>
    <Text style={tw.style("py-3")}>Select emotions</Text>
    <View style={tw.style("flex-row justify-between")}>
      <CircleIcon />
      <CircleIcon />
      <CircleIcon />
      <CircleIcon />
      <CircleIcon />
      <CircleIcon iconName />
    </View>
  </View>

  <View>
    <View style={tw.style("flex-row items-center justify-between")}>
      <Text>Show number of likes </Text>
      <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
    </View>

    <View style={tw.style("flex-row items-center justify-between ")}>
      <Text>Show number of likes </Text>
      <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
    </View>
  </View>
</View>;
